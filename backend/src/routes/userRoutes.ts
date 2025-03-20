import express, { Router } from 'express';
import { initializeAccount } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.post('/add-member', initializeAccount);  // Handles the POST request to add a new member

export default userRouter;
