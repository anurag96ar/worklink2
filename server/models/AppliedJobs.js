import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    default: '', // You can set a default value if needed
  },
  appliedBy: {
    type: String,
    required: true, // If this field is required
  },
  jobTitle: {
    type: String,
    default: '', // You can set a default value if needed
  },
});

const JobModel = mongoose.model('AppliedJob', jobSchema);

export default JobModel;
