import express, { Router } from 'express';
import { initializeAccount, retrieveTotalMembers } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.post('/add-member', initializeAccount);  // Handles the POST request to add a new member
userRouter.get('/retrieve-user-count', retrieveTotalMembers)

export default userRouter;
