import { json } from 'express'
import aj from '../lib/arcjet.js'
import { isSpoofedBot } from '@arcjet/inspect'

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req)
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res
                    .status(429)
                    .json({ msg: 'Rate limit exceeded Please try again later' })
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ msg: 'Bot access denied' })
            } else {
                return res
                    .status(403)
                    .json({ msg: 'Access Denied by security policy ' })
            }
        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({msg:"Malicious bot activity detected"});
        }

        next();
    } catch (err) {
        console.error('Arcjet Protection Error: ', err)
    }
}
