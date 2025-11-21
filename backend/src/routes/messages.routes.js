import express from 'express';
import { getAllContacts,getAllChats,getMessages,sendMessage,sendReply,getChatProfile } from '../controller/message.controller.js';
import { protectRoute} from '../middleware/auth.middleware.js';
const router = express.Router();

router.get("/contacts",protectRoute,getAllContacts);
router.get("/chats",protectRoute,getAllChats);
router.get("/chats/:id",protectRoute,getChatProfile);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);
router.post("/ai",sendReply);

export default router;
