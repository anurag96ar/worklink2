import React, { useEffect, useState } from "react";
import axios from "axios";
import EmpNavbar from "../../components/EmpNavbar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function EmpJobListing() {
  const [jobData, setJobData] = useState([]);
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setUserMail(userEmail);
    axios
      .get("http://localhost:3001/employer/joblist")
      .then((response) => {
        // Check if the response data is an array before setting the state
        if (Array.isArray(response.data)) {
          setJobData(response.data);
        } else {
          console.error("Invalid data received from the server:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApplied = async (email,jobId) => {
  
    localStorage.setItem("email",email)
    localStorage.setItem("jobId",jobId)
    
    navigate(`/appliedList`)
  };

  return (
    <div>
      <EmpNavbar />
      <section style={{ paddingTop: "100px" }} className="container px-4 mx-auto">
        <div className="flex items-center justify-between gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Jobs</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {jobData.length} Jobs
          </span>
          <Button
            variant="primary"
            onClick={() => {
              // Add a function to navigate to the Create Job page
              navigate("/employerJob");
            }}
          >
            Create Job
          </Button>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
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
                            variant="primary"
                            className="text-indigo-600 hover-text-indigo-900 dark:text-indigo-400 dark:hover-text-indigo-600 mx-3"
                            onClick={() => {
                              // Add a function to navigate to the Create Job page
                             handleApplied(jobs.email,jobs._id)
                            }}
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
    </div>
  );
}

export default EmpJobListing;
