import  express  from "express";

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    connections,
    getConnectionList,
    acceptRequest,
    myConnectionList,
    deleteRequest,
    removeConnection,
    getFriendProfile,
  
    editUserDetails,
    userJobsList,
    userConversation,
    getConversation,
    userMessage,
    getMessages,
    getAllUsers,
    applyJob,
    getNofication,
    markNotificationRead,
    getJobDetails
} from "../controllers/users.js"

import { verifyToken } from "../middleware/auth.js";
import { jobCreation } from "../controllers/employer.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.post("/profile/:id", verifyToken, editUserDetails);

router.get("/friend/:email", verifyToken, getFriendProfile);

router.get("/:id/friends", verifyToken, getUserFriends);


/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.post("/connect",connections)
router.post("/myRequest",getConnectionList)
router.post("/accept",acceptRequest)
router.post("/myConnections",myConnectionList)
router.post("/delete",deleteRequest)
router.post("/unfollowUser",removeConnection)
router.post("/joblist",userJobsList)
router.post("/conversation",userConversation)
router.get("/getconversation/:userId",getConversation)
router.post("/message",userMessage)
router.get("/getmessage/:conversationId",getMessages)
router.get("/getall/:conversationId",getAllUsers)
router.post("/applyJob",applyJob)
router.get("/getNotification/:email",getNofication)
router.post("/markRead",markNotificationRead)
router.post("/getjobdetail",getJobDetails)


export default router;