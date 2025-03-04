import { register, login, logout, resetPassword } from "../controllers/authController";
import Router from 'express';

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/resetPassword', resetPassword)

export default router