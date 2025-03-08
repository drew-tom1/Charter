import express, { Router } from 'express';
import { ping } from '../controllers/testController';

const router: Router = express.Router();

router.post("/ping", ping);

export default router;