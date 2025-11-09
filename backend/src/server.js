import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/messages.routes.js";
import { connectDB } from './lib/db.js';


dotenv.config();

const app = express();

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
app.listen(PORT, () => {
    console.log("server is working");
})




