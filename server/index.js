import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import passport from "passport";


import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { empRegister, jobCreation } from "./controllers/employer.js";
import { uploadProfile,userJobsList } from "./controllers/users.js";
import { commentPost, likePost,editTilte,deletepost } from "./controllers/posts.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import employerRoutes from "./routes/employer.js";

import { createPost, getFeedPosts, getUserPosts,reportPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Admin from "./models/Admin.js";

import helmet from "helmet";
import { getUsersList, getConnectionList } from "./controllers/users.js";
import { blockPost } from "./controllers/adminCtrl.js";

import { Server as SocketServer } from 'socket.io';
import { initialiseSocket } from "./controllers/users.js";
import { initialSocket } from "./controllers/employer.js";


const io = new SocketServer(3002, {
  cors: {
    origin: '*',
  },
});




let users = [];
io.on('connection', socket => {
    console.log('User connected', socket.id);
    socket.on('addUser', userId => {

        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });

    socket.on("join-room",(email)=>{
    socket.join(email)
    console.log(`joined room ${email}`);
    })
    
    socket.emit("test",{message:"Success"})
   
    socket.on("new-connection",(data)=>{
      console.log(data,"new Data here");
    })

    socket.on("new-job",(data)=>{
      console.log(data,"new Data here");
    })


    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
      console.log(users,"userIO");
        const receiver = users.find(user => user.userId === receiverId);
        console.log(receiver,"receiverData");
        const sender = users.find(user => user.userId === senderId);
        console.log(sender,"senderData");

        const user = await User.findById(senderId);
        console.log(user,"userData data");
        console.log('sender :>> ', sender, receiver);
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id, firstName: user.firstName, email: user.email }
            });
            }else {
                io.to(sender.socketId).emit('getMessage', {
                    senderId,
                    message,
                    conversationId,
                    receiverId,
                    user: { id: user._id, firstName: user.firstName, email: user.email }
                });
            }
        });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
    // io.emit('getUsers', socket.userId);
});

initialiseSocket(io)
initialSocket(io)


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors( {
    origin: '*',
  }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/employer/createJob",  jobCreation);

app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post("/searchList", verifyToken, getUsersList);
app.post("/getPost", getFeedPosts);
app.get("/posts/:userId/:page/posts", getUserPosts);
app.patch("/:id/like", likePost);
app.patch("/:id/comment", commentPost);
app.patch("/:id/report", reportPost);
app.post("/blockPost/:id", blockPost);


app.post("/title/:id", verifyToken, editTilte);
app.delete("/deletePost/:id", verifyToken, deletepost);


app.post("/employer/register", upload.single("picture"), empRegister);
app.post("/joblist",userJobsList)

app.post(
  "/uploadProfile",
  verifyToken,
  upload.single("picture"),
  uploadProfile
);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/employer", employerRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
