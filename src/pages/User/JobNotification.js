import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import Navbar from "../../components/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JobNotification = () => {
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const token = useSelector((state) => state.token);
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const { email } = useSelector((state) => state.user);
  const [jobData,setJobData] =useState()
  const myJobid = localStorage.getItem("jobId");
  console.log(myJobid, "job ID here");

  const getJobDetails = async () =>{
    const formData = new FormData();
    formData.append("jobId", myJobid);

    const response = await axios.post(
        `http://localhost:3001/users/getjobdetail`,formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setJobTitle(response.data.jobTitle)
      setJobDescription(response.data.jobDescription)
      setLocation(response.data.location)

      
  }

  useEffect(()=>{
    getJobDetails()
  },[])

  const applyJob = async () => {
    const formData = new FormData();
    formData.append("appliedBy", email);
    formData.append("jobId", jobId);
    formData.append("jobTitle", jobTitle);

    try {
      const response = await axios.post(
        "http://localhost:3001/users/applyJob",

        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const jobsApplied = response.data;

      toast.success("Job Applied successfully");
      navigate("/feeds")
    } catch (error) {
      // Handle errors here
      console.error("Error uploading post:", error);
    }
  };
  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <WidgetWrapper
          width="50%"
          height="400px"
          style={{ textAlign: "center" }}
        >
          <h2>Job</h2>
          <Typography variant="h5" padding="10px">
            {jobTitle}
          </Typography>
          <Typography variant="h5" padding="10px">
            {jobDescription}
          </Typography>
          <Box padding="10px">
            <Typography variant="h5">Location, India</Typography>
            <Typography variant="h6" paddingLeft="10px" color="#088395">
            {location}
            </Typography>
          </Box>

          <Button
            onClick={() => {
              applyJob();
            }}
            variant="primary"
            className="text-indigo-600 hover-text-indigo-900 dark:text-indigo-400 dark:hover-text-indigo-600 mx-3" // Increased margin
          >
            Apply
          </Button>
        </WidgetWrapper>
        <ToastContainer/>
      </Box>
    </Box>
  );
};

export default JobNotification;
