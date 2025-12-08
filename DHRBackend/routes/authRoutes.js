import express from 'express';
import { loginUser, registerUser,otpSend,otpVerify } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// post /api/auth/send-otp
router.post('/send-otp', otpSend);
// post /api/auth/verify-otp
router.post('/verify-otp', otpVerify);

export default router;