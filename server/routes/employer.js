import  express  from "express";

import {
    empVerifyOtp,
    empLogin,
    getJobsList,
    appliedUser
} from "../controllers/employer.js"

const router = express.Router();
 
router.post("/emplogin",empLogin)
router.post("/otp",empVerifyOtp)
router.get("/joblist",getJobsList)
router.post("/applied",appliedUser)





export default router;