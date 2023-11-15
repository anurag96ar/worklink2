import React, { useEffect, useState } from "react";
import axios from "axios";
import EmpNavbar from "../../components/EmpNavbar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";

function AppliedUsers() {
  const [jobData, setJobData] = useState([]);
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const [jobId,setJobId] = useState()
  

  localStorage.getItem("email",userMail)


  const getAppliedUser = async () => {
    
    const formData = new FormData();
   
    formData.append("jobId",jobId );

    console.log(formData);
  const response = await instance.post(`/employer/applied`,formData,
  {
    headers: {
     
      'Content-Type': 'application/json'
    },
  },)
  setJobData(response.data)
}

useEffect(() => {
    const userEmail= localStorage.getItem("email")
    setUserMail(userEmail)
    const jobId= localStorage.getItem("jobId")
    setJobId(jobId)
    getAppliedUser();
  }, [userMail,jobId]);

  

  

  return (
    <div>
      <EmpNavbar />
      <section style={{ paddingTop: "100px" }} className="container px-4 mx-auto">
        <div className="flex items-center justify-between gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Jobs</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {jobData.length} Jobs
          </span>
         
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <Table responsive striped bordered hover>
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th>Job Title</th>
                      <th>Applied By</th>
                      
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {jobData.map((jobs) => (
                      <tr key={jobs._id}>
                        <td>{jobs.jobTitle}</td>
                        <td className="text-green-500 dark:text-green-400">
                        {jobs.appliedBy}
                        </td>
                        
                        <td>
                          <Button
                          onClick={()=>{
                            localStorage.setItem("userEmail",jobs.appliedBy);
                             navigate("/empuserdetails");}}
                            variant="primary"
                            className="text-indigo-600 hover-text-indigo-900 dark:text-indigo-400 dark:hover-text-indigo-600 mx-3"
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

export default AppliedUsers;
