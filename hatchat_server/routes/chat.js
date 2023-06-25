import { Router } from 'express';
import chatController from '../controllers/chat.js';
import messageController from "../controllers/message.js";


const router = Router();

router.route('/')
    .post(chatController.addNewChat)
    .get(chatController.getAllChats);

router.route('/:id')
    .get(chatController.getChatByID)
    .delete(chatController.deleteChatByID);

router.route('/:id/Messages')
    .post(messageController.addMessage)
    .get(messageController.getMessage);

export default router;