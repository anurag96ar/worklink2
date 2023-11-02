import mongoose from "mongoose";

const EmployerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    businessType: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    otp:{
      type:String,
      
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    
    isVerified: {
      type: Boolean,
      default: false, 
    },

    blockStatus: {
      type: Boolean,
      default: false, 
    },

    isApproved: {
        type: Boolean,
        default: false, 
      },
    
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },

    friends: [{
      friend_email: {
          type: String,
          default: ''
      }
  }],
  
    location: String,
    occupation: String,
  },
  { timestamps: true }
);

const Employer = mongoose.model("Employer", EmployerSchema);
export default Employer;