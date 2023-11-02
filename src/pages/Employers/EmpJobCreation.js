import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createJobFunction } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import "../../styles/mix.css";
import EmpNavbar from "../../components/EmpNavbar";
import { Padding } from "@mui/icons-material";
import { useSelector } from "react-redux";

function EmpJobCreation() {
  const email = localStorage.getItem("userEmail");
  const [inputdata, setInputdata] = useState({
    jobTitle: "",
    jobDescription: "",
    location: "",
    salary: "",
    email: email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { jobTitle, jobDescription, location, salary } = inputdata;

    if (jobTitle === "") {
      toast.error("Enter Your Job Title");
    } else if (jobDescription === "") {
      toast.error("Enter Your Job Description");
    } else if (location === "") {
      toast.error("Enter Your Location");
    } else if (salary === "") {
      toast.error("Enter the salary");
    } else {
      const response = await createJobFunction(inputdata);

      if (response.status === 201) {
        setInputdata({
          jobTitle: "",
          jobDescription: "",
          location: "",
          salary: "",
        });
        toast.success("Job Created Successfully");
        navigate("/empJobsList");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <>
      <EmpNavbar />
      <section style={{paddingTop:"70px"}}>
        <div className="form_data">
          <div className="form_heading">
            <h1>Job</h1>
            <p style={{ textAlign: "center" }}>
            Good Life Begins With A Good Company
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                placeholder="Enter Your Job Title"
              />
            </div>
            <div className="form_input">
              <label htmlFor="jobDescription">Job Description</label>
              <textarea
                name="jobDescription"
                onChange={handleChange}
                placeholder="Enter Your Job Description"
                style={{
                  width: "100%", // Ensure the textarea spans the full width of its container
                  padding: "8px", // Add padding for better visual spacing
                  boxSizing: "border-box", // Include padding in the width calculation
                  minHeight: "100px", // Set a minimum height to prevent the textarea from collapsing
                  border: "1px solid #ccc"
                }}
              />
            </div>
            <div className="form_input">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                placeholder="Enter the Salary"
                inputMode="numeric" // Allows only numeric input on some devices
              />
            </div>
            <div className="form_input">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                placeholder="Enter Your Location"
              />
            </div>
            <button className="btn" onClick={handleSubmit}>
              Create Job
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default EmpJobCreation;
