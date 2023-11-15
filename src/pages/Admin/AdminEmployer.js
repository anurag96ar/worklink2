import React, { useEffect, useState } from "react";
import axios from "axios";
import Headers from "../../components/Headers";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { instance } from "../../services/axiosInterceptor";

const AdminEmployers = () => {
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    instance
      .get("/admin/employerlist")
      .then((response) => {
        // Check if the response data is an array before setting the state
        // console.log(response.data);
        if (Array.isArray(response.data)) {
          setEmpData(response.data);
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

  const handleBlock = async (id) => {

const res = await instance.put(`/admin/blockEmp/${id}`);
  

    const updatedUser = empData.map((i) =>
      i._id === id ? { ...i, blockStatus: true } : i
    );
    setEmpData(updatedUser);
  };

  const handleUnblock = async (id) => {
    const resss = await instance.put(
      `/admin/unblockEmp/${id}`
    );
  

    const updatedUser = empData.map((i) =>
      i._id === id ? { ...i, blockStatus: false } : i
    );
    setEmpData(updatedUser);
  };

  const empApprove = async (id) => {
    const resss = await instance.put(
      `/admin/approve/${id}`
    );
 

    const updatedUser = empData.map((i) =>
      i._id === id ? { ...i, isApproved: true } : i
    );
    setEmpData(updatedUser);
  };

  return (
    <div>
      <Headers />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Employers
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {empData.length} employers
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <Table responsive striped bordered hover>
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th>Employer</th>
                      <th>Location</th>
                      <th>Joining Date</th>
                      <th>Actions</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {empData.map((emp) => (
                      <tr key={emp._id}>
                        <td>{emp.companyName}</td>
                        <td className="text-green-500 dark:text-green-400">
                          {emp.location}
                        </td>
                        <td className="text-gray-500 dark:text-gray-400">
                          {new Date(emp.createdAt).toLocaleString()}
                        </td>
                        <td>
                          {/* <Button
                            variant="primary"
                            className="text-indigo-600 hover-text-indigo-900 dark:text-indigo-400 dark:hover-text-indigo-600 mx-3" // Increased margin
                          >
                            View Details
                          </Button> */}
                          {emp.blockStatus ? (
                            <Button
                              variant="success"
                              onClick={() => handleUnblock(emp._id)}
                              className="ml-3" // Increased margin
                            >
                              Unblock
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              onClick={() => handleBlock(emp._id)}
                              className="ml-3" // Increased margin
                            >
                              Block
                            </Button>
                          )}
                          
                        </td>
                        <td>
                        {emp.isApproved ? (
                           <p>Approved</p>
                          ) : (
                            <Button
                              variant="success"
                              onClick={() => empApprove(emp._id)}
                              className="ml-3" // Increased margin
                            >
                              Appove
                            </Button>
                          )}
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
};

export default AdminEmployers;
