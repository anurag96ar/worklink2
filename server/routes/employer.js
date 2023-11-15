import  express  from "express";

import {
    empVerifyOtp,
    empLogin,
    getJobsList,
    appliedUser,getJobAppliedCount
} from "../controllers/employer.js"

import { empVerification } from "../middleware/auth.js";

const router = express.Router();
 
router.post("/emplogin",empVerification,empLogin)
router.post("/otp",empVerifyOtp)
router.post("/joblist",getJobsList)
router.post("/applied",appliedUser)
router.post("/getJobAppliedCount",getJobAppliedCount)





export default router;