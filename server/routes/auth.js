import express from 'express';
import {login,register,verifyOtp} from '../controllers/auth.js'

const router = express.Router();
 
router.post("/login",login)
router.post("/otp",verifyOtp)

export default router;
