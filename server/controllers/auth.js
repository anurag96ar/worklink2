import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import ConnectRequest from "../models/ConnectRequest.js";


const transporter = nodemailer.createTransport({
  // Configure your email provider settings here
  // For example, for Gmail:
  service: "gmail",
  auth: {
    user: "anu.ragar0818@gmail.com",
    pass: "yllupvotekirihap",
  },
});

export const register = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        recentJob,
        employementType,
      } = req.body;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      const newUser = new User({
        firstName, 
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        recentJob,
        employementType,
        otp:otp,
      });
      const savedUser = await newUser.save();
      const mailOptions = {
        from: 'anu.ragar0818@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP: ${otp}`,
      };
    
      await transporter.sendMail(mailOptions);
      res.status(201).json({ user: savedUser, otp });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  export const verifyOtp = async(req,res)=>{
   console.log("Here >>>>>>>>>>>>>>>>>");
   console.log(req.body);
  try {
    const { otp, email } = req.body;

    // Retrieve the user from the database based on email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Check if the OTPs match
    if (user.otp === otp) {
      // Mark the user as verified and clear the OTP field
      await User.findByIdAndUpdate(user._id, { isVerified: true, otp: null });

      res.status(200).json({ message: 'OTP Verified Successfully' });
    } else {
      res.status(400).json({ message: 'Incorrect OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
  }
  


  /* LOGGING IN */
export const login = async (req, res) => {
    try {
      
      
      const { email, password } = req.body;
      const user = await User.findOne({ email: email, blockStatus:false });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export   const googleLogin = async (req, res) => {
    try {
      console.log("googleLogin");
      const { email } = req.body;
      console.log(email, "req body email");
    ;
      const user = await User.findOne({ email: email, blockStatus:false });
      // if (!user) return res.status(400).json({ msg: "User does not exist. " });
      // console.log(user, "----user----------");
      if (user) {
        console.log("inside user");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({
          message: "Google Login",
          token,
          user
        });
      } else {
        return res.json({ message: "Invalid User", email: email });
      }
    } catch (error) {
      console.log(error);
    }
  };

  

 


 