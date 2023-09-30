import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import User from "../models/User.js";
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

  const user=await User.findByIdAndUpdate(req.params.id);
  user.blockStatus=false;
  await user.save();
  res.json({message:"user unblocked successfully"})
}

export const blockUser=async(req,res)=>{

  const user=await User.findByIdAndUpdate(req.params.id)
  user.blockStatus=true
  await user.save()
  res.json({message:"user blocked successfully"})
}