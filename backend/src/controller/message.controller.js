import cloudinary from '../lib/cloudinary.js';
import MessageData from '../model/Message.js'
import NewUser from '../model/User.js'



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

        res.status(201).json(newMessage);

    } catch (err) {
        console.error("Error in SendMessage Controller !");
        res.status(500).json({ msg: "Internal server problem" });
    }
}