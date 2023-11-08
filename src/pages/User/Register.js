import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import "../../styles/mix.css";
import Headers from "../../components/Headers";
import { useParams } from "react-router-dom";
const Register = () => {
  const { name } = useParams();
  console.log(name,"emailll");
  const [passhow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    firstName: "",
    lastName: "",
    email: name=="newuser"?"":name,
    password: "",
    location: "",
    recentJob: "",
    employementType: "",
    employementTypeDropdown: "",
  });

  const navigate = useNavigate();

  // setinputvalue
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setInputdata({
      ...inputdata,
      employementTypeDropdown: selectedValue, // Update the dropdown value in state
      employementType: selectedValue, // Update the input field value in state
    });
  };

  // register data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      location,
      recentJob,
      employementType,
    } = inputdata;
    console.log(inputdata);

    if (firstName === "") {
      toast.error("Enter Your Firstname");
    } else if (lastName === "") {
      toast.error("Enter Your Lastname");
    } else if (email === "") {
      toast.error("Required field");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("Password should be minimum of 6 character");
    } else if (location == "") {
      toast.error("Enter your location");
    } else if (recentJob == "") {
      toast.error("Enter your recent job");
    } else if (employementType == "") {
      toast.error("Enter the employement type");
    } else {
      const response = await registerfunction(inputdata);

      if (response.status === 201) {
        setInputdata({
          ...inputdata,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          location: "",
          recentJob: "",
          employementType: "",
        });
        console.log(inputdata.email);
        localStorage.setItem("userEmail", inputdata.email);
        navigate("/user/otp", { state: { email: inputdata.email } });
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <>
      <Headers />
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage your
              tasks! We hope that you will get like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                id=""
                onChange={handleChange}
                placeholder="Enter Your First Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Last Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"               
                value={inputdata.email}
                id=""
                onChange={handleChange}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="location">Location</label>
              <input
                type="location"
                name="location"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Location"
              />
            </div>
            <div className="form_input">
              <label htmlFor="recentJob">Recent Job</label>
              <input
                type="recentJob"
                name="recentJob"
                id=""
                onChange={handleChange}
                placeholder="Enter the recent job"
              />
            </div>
            <div className="form_input">
              <label htmlFor="employementType">Employment Type</label>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  name="employementType"
                  id="employementType"
                  value={inputdata.employementTypeDropdown} // Bind the input value to state
                  onChange={handleChange}
                  placeholder="Enter the Employement type"
                  readOnly
                />

                <select
                  name="employementTypeDropdown"
                  id="employementTypeDropdown"
                  value={inputdata.employementTypeDropdown} // Bind the dropdown value to state
                  onChange={handleDropdownChange}
                >
                  <option value="">&#9660;</option>
                  <option value="Full-time">Full-Time</option>
                  <option value="Part-time">Part-Time</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passhow ? "password" : "text"}
                  name="password"
                  id=""
                  onChange={handleChange}
                  placeholder="Enter Your password"
                />
                <div className="showpass" onClick={() => setPassShow(!passhow)}>
                  {!passhow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p>Don't have and account </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
