import express, { Router } from 'express';
import { deleteAccount, initializeAccount, retrieveMemberList, retrieveSectionCardsInfo } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.post('/add-member', initializeAccount);  // Handles the POST request to add a new member
userRouter.get('/retrieve-section-card-info', retrieveSectionCardsInfo) // Handles the Section Cards part of the dashboard
userRouter.get('/retrieve-user-list', retrieveMemberList) // retrieves the list of members to be displayed in the table on the dashboard
userRouter.delete('/delete-member/:id', deleteAccount) // Handles the DELETE request to remove members based on their id.

export default userRouter;
