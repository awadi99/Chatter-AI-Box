import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/messages.routes.js";
import { connectDB } from './lib/db.js';
import {app, server} from "./lib/socket.js";


dotenv.config();



app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))
app.use(express.json({ limit: "25mb" }));

app.use(cookieParser())
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

connectDB();
server.listen(PORT, () => {
    console.log("server is working");
})




