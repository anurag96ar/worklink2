import React from 'react'
import Navbar from "../../components/Navbar"
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useMediaQuery } from "@mui/material";
import UserWidget from './UserWidgets';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UserImage from "../../components/UserImage";

function AllInvites() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [connectionData, setConnectionData] = useState([]);

  const token = useSelector((state) => state.token);
  const email = useSelector((state) => state.user.email);

  const getRequest = async () => {
    const formData = new FormData();
    formData.append("email", email);
   

    var data = await axios.post(
      "http://localhost:3001/users/myRequest",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setUserData(data.data);
  
  };

  const getConnection = async () => {
    const formData = new FormData();
    formData.append("email", email);
   

    var data = await axios.post(
      "http://localhost:3001/users/myConnections",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setConnectionData(data.data);
    
  };


  useEffect(() => {
    getRequest();
    getConnection();
  }, []);

  const handleClick = async (data) => {
    // Handle the click event here, for example:
    console.log(`Clicked item with data: ${data}`);
    const formData = new FormData();
    formData.append("requestFrom", data);
   

    try {
      const response = await axios.post(
        "http://localhost:3001/users/accept",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const connect = response.data;
      // window.location.reload();
      // this.setConnectionData()
      getRequest();
      getConnection();


     
    } catch (error) {
      // Handle errors here
      console.error("Error uploading post:", error);
    }
  };
  
  return (
    <Box>
        <Navbar/>
    
        <Box
        paddingTop="120px"
        flexBasis={isNonMobileScreens ? "100%" : undefined}
      >
        <WidgetWrapper
          width="50%"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          <Typography variant="h4" padding="10px" style={{ textAlign: "left" }}>
            {" "}
            Invites
          </Typography>
          <Typography
            onClick={() => navigate("/allInvites")}
            variant="h6"
            padding="10px"
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            {" "}
            See All ({userData.length})
          </Typography>
          <Divider />
          {userData.length < 1 ? (
            <Typography
              variant="h4"
              padding="10px"
              style={{ textAlign: "center" }}
            >
              {" "}
              No Invites
            </Typography>
          ) : (
            <Box></Box>
          )}
          {userData.map((user) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              {/* Image holder */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "lightgray",
                  borderRadius: "50px",
                }}
              >
                <UserImage size="80px" image={user.picturePath} />
              </div>
              {/* Text */}
              <div style={{ marginLeft: "20px" }}>
                <Typography variant="h4" padding="10px">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color={medium}>{user.recentJob}</Typography>
              </div>
              {/* Accept button */}
              <Button
                onClick={() => handleClick(user.email)}
                variant="contained"
                color="primary"
                style={{ marginLeft: "auto", borderRadius: "50px" }}
              >
                Accept
              </Button>
            </div>
          ))}
        </WidgetWrapper>
        <Box m="2rem 0" />
        {/* <FriendListWidget userId={userId} /> */}
      </Box>
      </Box>
  )
}

export default AllInvites
