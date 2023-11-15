import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import Navbar from "../../components/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";

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
  const [showApply, setShowApply] = useState(true);

  const myJobid = localStorage.getItem("jobId");


  const getJobDetails = async () =>{
    const formData = new FormData();
    formData.append("jobId", myJobid);

    const response = await instance.post(
        `/users/getjobdetail`,formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setJobTitle(response.data.jobTitle)
      setJobDescription(response.data.jobDescription)
      setLocation(response.data.location)

      checkAppliedJob(myJobid)
  }

  useEffect(()=>{
    getJobDetails()
  },[])

  const applyJob = async () => {
    const formData = new FormData();
    formData.append("appliedBy", email);
    formData.append("jobId", myJobid);
    formData.append("jobTitle", jobTitle);

    try {
      const response = await instance.post(
        "/users/applyJob",

        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jobsApplied = response.data;

      toast.success("Job Applied successfully");
      // navigate("/feeds")
      setShowApply(false)
      
    } catch (error) {
      // Handle errors here
      console.error("Error uploading post:", error);
    }
  };

  const checkAppliedJob = async (data) => {
    const formData = new FormData();
    formData.append("appliedBy", email);
    formData.append("jobId", data);

    console.log(data, "and", email);

    try {
      const response = await instance.post(
        "/users/checkapplied",

        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const checkApplied = response.data;
      if (checkApplied.length > 0) {
        
        setShowApply(false);
        console.log(showApply,"show apply value");
       

      }
      else{
        console.log(showApply,"show apply value in else");
       
      }
      

      console.log(checkApplied, "Applied data");
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
                        variant="primary"
                        onClick={() => {
                          if (showApply) {
                            applyJob();
                          }

                        }}
                        disabled={!showApply}
                      >
                        {!showApply ? "Job Applied" : "Apply"}
                      </Button>
        </WidgetWrapper>
        <ToastContainer/>
      </Box>
    </Box>
  );
};

export default JobNotification;
