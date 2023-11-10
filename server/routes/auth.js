import express from 'express';
import {googleLogin, login,register,verifyOtp} from '../controllers/auth.js'




const router = express.Router();
 
router.post("/login",login)
router.post("/otp",verifyOtp)
router.post("/gooleLogin",googleLogin)

export default router;