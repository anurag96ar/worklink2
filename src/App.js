import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import HomePage from "./pages/User/Dashboard";
import ProfilePage from "./pages/User/ProfilePage";
import Connections from "./pages/User/Connections";
import Otp from "./pages/User/Otp";
import Error from "./pages/User/Error";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import AdminUsers from "./pages/Admin/AdminUsers";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Headers from "./components/Headers";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import SearchList from "./pages/User/SearchList"
import AllConnections from "./pages/User/AllConnections";
import EmployerLogin from "./pages/Employers/EmployerLogin";
import EmployerOtp from "./pages/Employers/EmployerOtp";
import AdminEmployers from "./pages/Admin/AdminEmployer";
import FriendProfile from "./pages/User/FriendProfile";
import EmployerRegisters from "./pages/Employers/EmployerRegisters";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import "./styles/mix.css";
import AllInvites from "./pages/User/AllInvites";
import EmpHome from "./pages/Employers/EmpHome";
// import UserDetails from "./pages/Admin/UserDetails";
import Details from "./pages/Admin/Details";
import UserDetails from "./pages/Admin/UserDetails";
import EmpJobCreation from "./pages/Employers/EmpJobCreation";
import EmpJobListing from "./pages/Employers/EmpJobListing";
import JobListing from "./pages/User/JobListing";
import ChatList from "./pages/User/ChatList";
import AppliedUsers from "./pages/Employers/AppliedUsers";
import JobNotification from "./pages/User/JobNotification";
import GoogleSignUp from "./pages/User/GoogleSignUp";



function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/googlesignupform" element={<GoogleSignUp />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/feeds"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
             <Route
              path="/jobLists"
              element={isAuth ? <JobListing /> : <Navigate to="/" />}
            />
            <Route path="/user/otp" element={<Otp />} />
            <Route path="*" element={<Error />} />

            <Route path="/employerRegister" element={<EmployerRegisters />} />
            <Route path="/employerLogin" element={<EmployerLogin />} />
            <Route path="/employerOtp" element={<EmployerOtp/>} />
            <Route path="/employerJob" element={<EmpJobCreation/>} />
            <Route path="/empJobsList" element={<EmpJobListing/>} />
            <Route path="/appliedList" element={<AppliedUsers/>} />


            <Route
              path="/emphomepage"
              element={isAuth ? <EmpHome /> : <Navigate to="/employerLogin" />}
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/userlist" element={<AdminUsers />} />
            <Route path="/admin/emplist" element={<AdminEmployers />} />
            <Route path="/admin/userdetails" element={<UserDetails />} />

            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/friendProfile/:userId"
              element={isAuth ? <FriendProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/connections"
              element={isAuth ? <Connections /> : <Navigate to="/" />}
            />
             <Route
              path="/jobapply"
              element={isAuth ? <JobNotification /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={isAuth ? <SearchList /> : <Navigate to="/" />}
            />

             <Route
              path="/chat"
              element={isAuth ? <ChatList /> : <Navigate to="/" />}
            />

            <Route
              path="/myConnections"
              element={isAuth ? <AllConnections/> : <Navigate to="/" />}
            />
            <Route
              path="/allInvites"
              element={isAuth ? <AllInvites/> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
