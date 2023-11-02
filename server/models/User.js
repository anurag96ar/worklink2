import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    recentJob: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    employementType: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    fromDate: {
      type: Date,
      get: function (value) {
        return value.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
    },
    toDate: {
      type: Date,
      get: function (value) {
        return value.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
    },

    education: {
      type: String,
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
    blockStatus:{
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

const User = mongoose.model("User", UserSchema);
export default User;