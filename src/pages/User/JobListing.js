import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Table from "react-bootstrap/Table";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Email, Padding } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { instance } from "../../services/axiosInterceptor";

function JobListing() {
  const [jobData, setJobData] = useState([]);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const token = useSelector((state) => state.token);
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const { email } = useSelector((state) => state.user);

  const [showApply, setShowApply] = useState(true);

  const handleSub = async (data) => {
    setModal(true);
    setShow(true);
    checkAppliedJob(data)
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setUserMail(userEmail);
    instance
      .post("/users/joblist", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Check if the response data is an array before setting the state
        // console.log(response.data);
        if (Array.isArray(response.data)) {
          setJobData(response.data);
        } else {
          console.error(
            "Invalid data received from the server:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const applyJob = async () => {
    const formData = new FormData();
    formData.append("appliedBy", email);
    formData.append("jobId", jobId);
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

      console.log(jobsApplied, "Applied data");

      toast.success("Job Applied successfully");
      handleClose();
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
    <div>
      <Navbar />
      <section
        style={{ paddingTop: "100px" }}
        className="container px-4 mx-auto"
      >
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Jobs
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {jobData.length} Jobs
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                {modal && (
                  <Modal
                    style={{ paddingTop: "100px" }}
                    show={show}
                    onHide={handleClose}
                    animation={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Job Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{jobDescription}</Modal.Body>
                    <Modal.Body>Salary: {salary}</Modal.Body>
                    <Modal.Body>Location: {location}</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
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
                    </Modal.Footer>
                  </Modal>
                )}
                <Table responsive striped bordered hover>
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th>Job Title</th>
                      <th>Location</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {jobData.map((jobs) => (
                      <tr key={jobs._id}>
                        <td>{jobs.jobTitle}</td>
                        <td className="text-green-500 dark:text-green-400">
                          {jobs.location}
                        </td>
                        <td className="text-gray-500 dark:text-gray-400">
                          {new Date(jobs.createdAt).toLocaleString()}
                        </td>
                        <td>
                          <Button
                            onClick={async () => {
                              setJobDescription(jobs.jobDescription);
                              setSalary(jobs.salary);
                              setLocation(jobs.location);
                            await   setJobId(jobs._id); 
                              setJobTitle(jobs.jobTitle);
                              setShowApply(true);
                              console.log(jobId, "My job id");
                              handleSub(jobs._id);
                            }}
                            variant="primary"
                            className="text-indigo-600 hover-text-indigo-900 dark:text-indigo-400 dark:hover-text-indigo-600 mx-3" // Increased margin
                          >
                          View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default JobListing;
