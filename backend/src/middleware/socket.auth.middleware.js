import jwt from 'jsonwebtoken';
import NewUser from '../model/User.js';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const KEY = process.env.JWT_SECRET;


export const socketAuthMiddleware =async(socket , next)=>{
    try{
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row)=>row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token){
            console.log("Socket Connection rejected: No token provided");
            return next(new Error("Unauthorized - No Token Provided"));
        }

        const decode = jwt.verify(token,KEY);
        if(!decode)
        {
            console.log("Socket Connection Rejected: Invaild token");
            return next (new Error("Unauthorized - Invaild Token"));
        }

        const user = await NewUser.findById(decode.userId).select("-password");
        if(!user){
            console.log("Socket connection rejected: User Not Found");
            return next(new Error("User not Found"));
        }

        socket.user=user;
        socket.userId=user._id.toString();
        next();
    }catch(err){
        console.log(err);
        next(new Error("Unauthorized - Authentication failed"));
    }
}