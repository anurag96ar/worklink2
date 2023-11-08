import Headers from "../../components/Headers";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/admin/login", {
        email,
        password,
      });
     
     
      const adminToken = response.data.adminToken;
      const adminEmailId = response.data.adminEmailId;
      console.log(adminToken);
      // Store the token securely (localStorage, cookie, etc.)
      localStorage.setItem("adminToken", adminToken);
      localStorage.setItem("adminEmailId", adminEmailId);
      // You can use `navigate` to programmatically navigate
      navigate("/admin/home"); // Example navigation
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Headers />
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <h3 className="fw-bold mb-2 text-center">
                Admins make it happen, every time.
              </h3>
              <div className="p-5 w-100 d-flex flex-column">
                <p className="text-white-50 mb-3">
                  Please enter your login and password!
                </p>

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
