import Employer from "../models/Employer.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import Job from "../models/Jobs.js";
import JobModel from "../models/AppliedJobs.js";
import Notification from "../models/Notification.js";

let io;
export const initialSocket = (ao) => {
  io = ao;
};

const transporter = nodemailer.createTransport({
  // Configure your email provider settings here
  // For example, for Gmail:
  service: "gmail",
  auth: {
    user: "anu.ragar0818@gmail.com",
    pass: "yllupvotekirihap",
  },
});

export const empRegister = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      picturePath,
      friends,
      location,
      businessType,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000);

    const newUser = new Employer({
      companyName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      businessType,
      otp: otp,
    });
    const savedUser = await newUser.save();
    const mailOptions = {
      from: "anu.ragar0818@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ user: savedUser, otp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const empVerifyOtp = async (req, res) => {
  console.log("Here >>>>>>>>>>>>>>>>>");
  console.log(req.body);
  try {
    const { otp, email } = req.body;

    // Retrieve the user from the database based on email
    const employer = await Employer.findOne({ email: email });

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Check if the user is already verified
    if (employer.isVerified) {
      return res.status(400).json({ message: "Employer is already verified" });
    }

    // Check if the OTPs match
    if (employer.otp === otp) {
      // Mark the user as verified and clear the OTP field
      await Employer.findByIdAndUpdate(employer._id, { isVerified: true, otp: null });

      res.status(200).json({ message: "OTP Verified Successfully" });
    } else {
      res.status(400).json({ message: "Incorrect OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

//employer login
export const empLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emp = await Employer.findOne({ email: email, blockStatus: false, isApproved: true });
    if (!emp) return res.status(400).json({ msg: "Employer does not exist. " });

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: emp._id }, process.env.JWT_SECRET);
    delete emp.password;
    res.status(200).json({ token, emp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const jobCreation = async (req, res) => {
  try {


    const {
      email,
      jobDescription,
      jobTitle,
      location,
      salary
    } = req.body;


    const newJob = new Job({
      email,
      jobDescription,
      jobTitle,
      location,
      salary
    });




    const savedJob = await newJob.save();
    console.log(savedJob, "Saved the job here");
    const id = savedJob._id

    const notification = new Notification({
      notification_title: jobTitle,
      jobId: id,
    })

    const savedNotification = await notification.save();

    console.log(savedNotification, "Notification data");

    io.emit("new-job", { message: "Success", job: savedJob });


    res.status(201).json({ job: savedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getJobsList = async (req, res) => {
  const { email } = req.body

  const jobsList = await Job.find({ email: email });

  res.json(jobsList);
}

export const appliedUser = async (req, res) => {
  const { jobId } = req.body
  const appliedList = await JobModel.find({ jobId: jobId });
  console.log(appliedList);
  res.json(appliedList);
}


export const getJobAppliedCount = async (req, res) => {
  const { email } = req.body
  console.log(email, "email")
  const jobList = await Job.find({ email: email });
  let count = 0;
  const data = await Promise.all(

    jobList.map(async (jobItem) => {
      // Query the table to find the ID for each job item

      const result = await JobModel.find({
        jobId: jobItem._id,

      });
      console.log(result, "result")
      if (result.length > 0) {
        count=count+result.length;
        return result; // Return the ID if found
      } else {
        return null; // Return null if not found
      }
    })
  );
  console.log(count, "count")
  res.json(count);
}