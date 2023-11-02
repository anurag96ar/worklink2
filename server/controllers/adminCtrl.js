import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import User from "../models/User.js";
import Employer from "../models/Employer.js";
import Post from "../models/Post.js"
const secretKey = "anurag";


export const adminLogin = async (req, res) => {
  // console.log("hi");

  try {
    const { email, password } = req.body;
    console.log(req.body, "-----------inside adminLogin");
    const adminDetails = await Admin.findOne({ email:email });
    console.log("req.body", req.body);
    console.log(adminDetails, "..........................");
    if (adminDetails && password === adminDetails.password) {
      const adminToken = jwt.sign( {
        _id: adminDetails._id, // Include the MongoDB document ID
        email: adminDetails.email, // Include other user-specific data as needed
      }, secretKey, { expiresIn: "1h" });
      // console.log(adminToken);
      // Return the token as a response
      return res.json({ adminToken:adminToken,adminEmailId:adminDetails.email });

    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsersList=async(req,res)=>{
  const usersList=await User.find({});
  console.log(usersList);
  res.json(usersList);
}

export const unblockUser=async(req,res)=>{
console.log("ublock unblock");
  const user=await User.findByIdAndUpdate(req.params.id);
  user.blockStatus=false;
  await user.save();
  res.json({message:"user unblocked successfully"})
}

export const blockUser=async(req,res)=>{
  const user=await User.findByIdAndUpdate(req.params.id)
  console.log(user);
  user.blockStatus=true
  await user.save()
  res.json({message:"user blocked successfully"})
}

export const getEmployerList=async(req,res)=>{
  const usersList=await Employer.find({});
  console.log(usersList);
  res.json(usersList);
}


export const unblockEmp=async(req,res)=>{
  console.log("ublock unblock");
    const user=await Employer.findByIdAndUpdate(req.params.id);
    user.blockStatus=false;
    await user.save();
    res.json({message:"user unblocked successfully"})
  }
  
  export const blockUserEmp=async(req,res)=>{
    const user=await Employer.findByIdAndUpdate(req.params.id)
    console.log(user);
    user.blockStatus=true
    await user.save()
    res.json({message:"user blocked successfully"})
  }

  export const approveEmp=async(req,res)=>{
    const user=await Employer.findByIdAndUpdate(req.params.id)
    console.log(user);
    user.isApproved=true
    await user.save()
    res.json({message:"user approved successfully"})
  }


  export const getUserDetails = async (req, res) => {
    try {
      
      const { email } = req.body;
      console.log(req.body);
     
      const user = await User.find({email:email});
   
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  export const getUserPost = async (req, res) => {
    try {
      console.log("Hetetettetetetettetetettetetet");
      const { email } = req.body;
      console.log(req.body);
      console.log(email,"nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
      const user = await Post.find({email:email});
      console.log(user,"post pots post");
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };


  export const blockPost = async (req, res) => {
    try {
      
      const { id } = req.params;
     
      const post = await Post.findById(id);
      const isBlocked = post.isBlocked;
  
      if (isBlocked) {
       post.isBlocked=false
      } else {
        post.isBlocked=true

      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { isBlocked: post.isBlocked },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };