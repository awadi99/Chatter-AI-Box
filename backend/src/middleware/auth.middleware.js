import NewUser from "../model/User.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const KEY = process.env.JWT_SECRET;

export const protectRoute = async (req, res, next) => {
    try {
        
        const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

        console.log("Extracted Token:", req.cookies);
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized - No token provided" });
        }

    
        let decoded;
        try {
            decoded = jwt.verify(token, KEY);
        } catch (err) {
            console.error("JWT verification failed:", err.message);
            return res.status(401).json({ msg: "Unauthorized - Invalid or expired token" });
        }

        
        const user = await NewUser.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error("Error in protectRoute middleware:", err);
        res.status(500).json({ msg: "Internal server problem" });
    }
};
