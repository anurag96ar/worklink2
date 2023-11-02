import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import "../../styles/mix.css";
import Headers from "../../components/Headers";
import { empRegister } from "../../services/Apis";

const Register = () => {
  const [passhow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    companyName: "",
   
    email: "",
    password: "",
    location: "",
   
    businessType: "",
    businessTypeDropdown: "",
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
      businessTypeDropdown: selectedValue, // Update the dropdown value in state
      businessType: selectedValue, // Update the input field value in state
    });
  };

  // register data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      companyName,
      email,
      password,
      location,
      businessType,
    } = inputdata;
    console.log(inputdata);

    if (companyName === "") {
      toast.error("Enter Your Company name");
    }  else if (email === "") {
      toast.error("Required field");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("Password should be minimum of 6 character");
    } else if (location == "") {
      toast.error("Enter your location");
    }  else if (businessType == "") {
      toast.error("Enter the employement type");
    } else {
      const response = await empRegister(inputdata);

      if (response.status === 201) {
        setInputdata({
          ...inputdata,
          companyName: "",
        
          email: "",
          password: "",
          location: "",
        
          businessType: "",
        });
        console.log(inputdata.email);
        localStorage.setItem("userEmail", inputdata.email);
        navigate("/employerOtp", { state: { email: inputdata.email } });
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
              <label htmlFor="companyName">Company name</label>
              <input
                type="text"
                name="companyName"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Company name"
              />
            </div>
            
            <div className="form_input">
              <label htmlFor="email">Company Email</label>
              <input
                type="email"
                name="email"
                id=""
                onChange={handleChange}
                placeholder="Enter Company Email Address"
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
              <label htmlFor="employementType">Business Type</label>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  name="employementType"
                  id="employementType"
                  value={inputdata.businessTypeDropdown} // Bind the input value to state
                  onChange={handleChange}
                  placeholder="Enter the Employement type"
                  readOnly
                />

                <select
                  name="employementTypeDropdown"
                  id="employementTypeDropdown"
                  value={inputdata.businessTypeDropdown} // Bind the dropdown value to state
                  onChange={handleDropdownChange}
                >
                  <option value="">&#9660;</option>
                  <option value="IT-Software">IT-Software</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="BPO">BPO</option>
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
