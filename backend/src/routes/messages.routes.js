import express from 'express';
import { getAllContacts,getAllChats,getMessages,sendMessage } from '../controller/message.controller.js';
import { protectRoute} from '../middleware/auth.middleware.js';
const router = express.Router();

router.get("/contacts",protectRoute,getAllContacts);
router.get("/chats",protectRoute,getAllChats);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);
export default router;