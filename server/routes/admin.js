import express from 'express';
import {adminLogin,getUsersList,getEmployerList,blockUser,unblockUser,blockUserEmp,unblockEmp,approveEmp,getUserDetails, getUserPost, blockPost,appliedJobs,blockedEmployee,blockedPost} from '../controllers/adminCtrl.js'

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
router.get("/appliedJobs",appliedJobs)
router.get("/blockedUser",blockedEmployee)
router.get("/blockedPost",blockedPost)




export default router;