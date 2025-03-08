import express from 'express';
import { initializeAccount } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/add-member', initializeAccount);  // Handles the POST request to add a new member

export default userRouter;
