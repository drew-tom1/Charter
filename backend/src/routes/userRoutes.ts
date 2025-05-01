import express, { Router } from 'express';
import { deleteAccount, initializeAccount, retrieveMemberList, retrieveTotalMembers } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.post('/add-member', initializeAccount);  // Handles the POST request to add a new member
userRouter.get('/retrieve-user-count', retrieveTotalMembers)
userRouter.get('/retrieve-user-list', retrieveMemberList)
userRouter.delete('/delete-member/:id', deleteAccount)

export default userRouter;
