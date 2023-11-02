import React, { useEffect, useState } from "react";
import axios from "axios";
import Headers from "../../components/Headers";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const AdminUsers = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [userMail,setUserMail]=useState("")
  
console.log(userMail,"YYYYYYYYYYYYYYYYYYYYYYY");
  useEffect(() => {
    const userEmail= localStorage.getItem("email")
    setUserMail(userEmail)
    axios
      .get("http://localhost:3001/admin/userslist")
      .then((response) => {
        // Check if the response data is an array before setting the state
        // console.log(response.data);
        if (Array.isArray(response.data)) {
          setUserData(response.data);
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
    const res = await axios.put(`http://localhost:3001/admin/blockUser/${id}`);
    console.log(id);
    console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const updatedUser = userData.map((i) =>
      i._id === id ? { ...i, blockStatus: true } : i
    );
    setUserData(updatedUser);
  };

  const handleUnblock = async (id) => {
    const resss = await axios.put(
      `http://localhost:3001/admin/unblockUser/${id}`
    );
    console.log(id);
    console.log(resss, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const updatedUser = userData.map((i) =>
      i._id === id ? { ...i, blockStatus: false } : i
    );
    setUserData(updatedUser);
  };

  const handleUserDetails = async (email,userId) => {
  
    localStorage.setItem("email",email)
    localStorage.setItem("userId",userId)
    
    navigate(`/admin/userdetails`)
  };

  return (
    <div>
      <Headers />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Users
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {userData.length} users
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <Table responsive striped bordered hover>
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th>Email Id</th>
                      <th>Location</th>
                      <th>Joining Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {userData.map((user) => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td className="text-green-500 dark:text-green-400">
                          {user.location}
                        </td>
                        <td className="text-gray-500 dark:text-gray-400">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                        <td>
                          <Button
                            onClick={() => handleUserDetails(user.email,user._id)
                              // navigate("/userdetails", { state: user.email })
                            }
                            variant="primary"
                            className="text-indigo-600 hover-text-indigo-900 dark:text-indigo-400 dark:hover-text-indigo-600 mx-3" // Increased margin
                          >
                            View Details
                          </Button>
                          {user.blockStatus ? (
                            <Button
                              variant="success"
                              onClick={() => handleUnblock(user._id)}
                              className="ml-3" // Increased margin
                            >
                              Unblock
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              onClick={() => handleBlock(user._id)}
                              className="ml-3" // Increased margin
                            >
                              Block
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

export default AdminUsers;
