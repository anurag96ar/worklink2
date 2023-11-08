import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/state';
import { useNavigate } from 'react-router-dom';
import Headers from "../../components/Headers"; // Import your Navbar component
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { instance } from '../../services/axiosInterceptor';


function EmployerLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await instance.post("/employer/empLogin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = response.data;
      dispatch(
        setLogin({
          user: data.emp, // Make sure to adjust the user property to match your response data
          token: data.token,
        })
      );
      localStorage.setItem("userEmail", email);
      navigate("/emphomepage");
    } else {
      // Handle login error here
      toast.error("Please Contact Administrator");
    }
  } catch (error) {
    // Handle request error
    console.error("Request error:", error);
  }
};

  return (
    <div>
      <Headers />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="w-75">
              {/* New text above email field */}
              <div className="mb-4">
                <h3 className="text-muted">Your gateway to the professional world</h3>
              </div>
              
              {/* Email input */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password input */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-info mb-4">
                Sign in
              </button>

              {/* Forgot password */}
              <p className="small mb-5">
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </p>

              {/* Register link */}
              <p>
                Don't have an account?{' '}
                <a href="/employerRegister" className="link-info">
                  Register here
                </a>
              </p>
            </form>
          </div>

          {/* Your existing right-side image column */}
          <div className="col-md-6 p-0">
            <img
              src="/employer.jpg"
              alt="Login image"
              className="w-100"
              style={{
                objectFit: 'cover',
                objectPosition: 'left',
                height: '680px', // Increase the height here
              }}
            />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default EmployerLogin;

