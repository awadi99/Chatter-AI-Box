import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);
const socketServer = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    },
});

socketServer.use(socketAuthMiddleware);

export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

const userSocketMap = {};

socketServer.on("connection", (socket) => {
    console.log("user connected", socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    socketServer.emit("getOnlineUser", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.fullName);

        delete userSocketMap[userId];

        socketServer.emit("getOnlineUser", Object.keys(userSocketMap));
    });
});

export { socketServer, app, server };
