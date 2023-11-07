import  express  from "express";

import {
    empVerifyOtp,
    empLogin,
    getJobsList,
    appliedUser,getJobAppliedCount
} from "../controllers/employer.js"

const router = express.Router();
 
router.post("/emplogin",empLogin)
router.post("/otp",empVerifyOtp)
router.post("/joblist",getJobsList)
router.post("/applied",appliedUser)
router.post("/getJobAppliedCount",getJobAppliedCount)





export default router;