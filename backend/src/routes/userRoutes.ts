import express from 'express';
import { initializeAccount } from '../controllers/userController';

const router = express.Router();

router.post('/add-member', initializeAccount);  // Handles the POST request to add a new member

export default router;
