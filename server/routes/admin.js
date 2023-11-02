import express from 'express';
import {adminLogin,getUsersList,getEmployerList,blockUser,unblockUser,blockUserEmp,unblockEmp,approveEmp,getUserDetails, getUserPost, blockPost} from '../controllers/adminCtrl.js'

const router = express.Router();
 
router.post("/login",adminLogin)
router.get("/userslist",getUsersList)
router.get("/employerlist",getEmployerList)
router.put("/blockUser/:id",blockUser)
router.put("/unblockUser/:id",unblockUser)
router.put("/blockEmp/:id",blockUserEmp)
router.put("/unblockEmp/:id",unblockEmp)
router.put("/approve/:id",approveEmp)
router.post("/usersdetails",getUserDetails)
router.post("/userspost",getUserPost)




export default router;