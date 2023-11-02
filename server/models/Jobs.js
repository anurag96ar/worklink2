import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
   
    jobTitle: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    jobDescription: {
      type: String,
      required: true,
      
    },
    salary: {
      type: String,
      required: true, 
    },
    
    email: {
      type: String,
      max: 50,  
    },
  
    location: String,
   
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
export default Job;