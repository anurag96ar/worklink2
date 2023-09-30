import express from 'express';
import {adminLogin,getUsersList} from '../controllers/adminCtrl.js'

const router = express.Router();
 
router.post("/login",adminLogin)
router.get("/userslist",getUsersList)

export default router;