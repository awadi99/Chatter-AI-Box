import cloudinary from '../lib/cloudinary.js';
import MessageData from '../model/Message.js'
import NewUser from '../model/User.js'
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { getReceiverSocketId, socketServer } from '../lib/socket.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const KEY = process.env.HF_TOKEN;



export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const fillteredUsers = await NewUser.find({ _id: { $ne: loggedInUserId } }).select("-password").limit(50);
        res.status(200).json(fillteredUsers);

    } catch (err) {
        console.error("Error is getAllContacts !");
        res.status(500).json({ msg: "Internal server Error" });
    }
}


export const getAllChats = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const messages = await MessageData.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId },
            ]
        })
        const chatPartnerIds = [
            ...new Set(
                messages.map(msg =>
                    msg.senderId.toString() === loggedInUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];
        const chatPartners = await NewUser.find({ _id: { $in: chatPartnerIds } }).select("-password");
        res.status(200).json(chatPartners);
    } catch (err) {
        console.error("Error in getAllChatPartners !");
        res.status(500).json({ msg: "Internal server problem" });
    }
}


export const getChatProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const chatProfile = await NewUser.findOne({ _id: id }).select("-password");
        if (!chatProfile) {
            return res.status(404).json({ msg: "User not found" })
        }
        res.status(200).json(chatProfile);
    } catch (err) {
        console.error("Error in getChatProfile");
        res.status(500).json({ msg: "Internal server problem" });
    }
}


export const getMessages = async (req, res) => {
    try {
        const myid = req.user._id;
        const { id: userToChatId } = req.params;
        const message = await MessageData.find({
            $or: [
                { senderId: myid, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myid },
            ]
        })
        res.status(200).json(message)
    } catch (err) {
        console.error("Server error");
        res.status(500).json({ msg: "Internal server problem" });
    }
};


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            const uploadeResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadeResponse.secure_url;
        }

        const newMessage = new MessageData({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId =getReceiverSocketId(receiverId)
        const senderSocketId = getReceiverSocketId(senderId.toString());
        if(receiverSocketId){
            socketServer.to(receiverSocketId).emit("newMessage", newMessage);
        }
        if(senderSocketId)
        {
            socketServer.to(senderSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);

    } catch (err) {
        console.error("Error in SendMessage Controller !");
        res.status(500).json({ msg: "Internal server problem" });
    }
}

// set up ai google /gemma-2-2b-it


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export const sendReply = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message.trim()) {
            return res.status(400).json({ reply: "Please send a message." });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",   
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }],
                },
            ],
        });

        const reply = response.text;
        res.status(200).json({ reply });

    } catch (err) {
        console.error("Chatter API Error:", err);
        res.status(500).json({
            reply: "AI error",
            details: err.message,
        });
    }
};