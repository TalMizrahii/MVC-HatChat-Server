import { Router } from 'express';
import userController from '../controllers/users.js';

const router = Router();

router.route('/')
    .post(userController.addNewUser);

router.route('/:id')
    .get(userController.getUserByUserName);

export default router;
