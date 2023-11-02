import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sentOtpFunction } from "../../services/Apis";
import Spinner from "react-bootstrap/Spinner";
import "../../styles/mix.css";
import { empVerify } from "../../services/Apis";
import { useLocation } from "react-router-dom";
import Headers from '../../components/Headers';

function EmployerOtp() {
  const [otp, setOTP] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");


  const navigate = useNavigate();

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };
  console.log(otp, "111111111111111111111111");
  const email = localStorage.getItem("userEmail");

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit");
    } else {
      const data = {
        otp: otp,
        email: email,
      };
      console.log(data);
      const response = await empVerify(data);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/employerLogin");
        }, 5000);
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
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp">Veify Your Email</label>
              <input
                type="text"
                name="email"
                id=""
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter the OTP"
              />
            </div>
            <button className="btn" onClick={LoginUser}>Verify OTP</button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default EmployerOtp;
