import Navbar from "../../components/Navbar";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useMediaQuery } from "@mui/material";
import UserWidget from "./UserWidgets";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { requestFunction } from "../../services/Apis";
import UserImage from "../../components/UserImage";
import { useLocation } from 'react-router-dom';


function SearchList() {
  const [userData, setUserData] = useState([]);
  
  
  const token = useSelector((state) => state.token);
  const  state = useLocation();

  const search = async ()=>{
    const formData = new FormData();
    
    formData.append("searchData", state.state);
    console.log(formData);
  var response= await axios
      .post("http://localhost:3001/searchList",formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      },)
      console.log(response,"rrrrrrrrrrrrrrrrrr");
      setUserData(response.data);
    
  }

  useEffect(() => {
    console.log(state.state,"vvvvvvvvvvvvvvvvvvvvvvvvv");
   
      search()
  }, []);

 
 
  
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const email = useSelector((state) => state.user.email);

  const handleClick = async (data) => {
    // Handle the click event here, for example:
    console.log(`Clicked item with data: ${data}`);
    const formData = new FormData();
        formData.append("requestTo", data);
        formData.append("requestFrom",email );
        console.log(formData);
      
        try {
          const response = await axios.post("http://localhost:3001/users/connect", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
      
          const connect = response.data;
          console.log(connect);
          
        } catch (error) {
          // Handle errors here
          console.error("Error uploading post:", error);
        }
      };
    



  return (
    <Box>
      <Navbar />
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
            Search Result
          </Typography>
          <Divider />
          {userData.map((user) => (
            <div
              key={user.id}
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
              <div style={{ marginLeft: "20px", flex: 1 }}>
                <Typography textAlign="left" variant="h4" padding="10px">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography textAlign="left" color={medium}>
                  {user.recentJob}
                </Typography>
              </div>

              {/* Accept button */}
              <Button
                onClick={() => handleClick(user.email)}
                variant="contained"
                color="primary"
                style={{ marginLeft: "auto", borderRadius: "50px" }}
              >
                Connect
              </Button>
            </div>
            
          ))}
        </WidgetWrapper>
        <Box m="2rem 0" />
        {/* <FriendListWidget userId={userId} /> */}
      </Box>
    </Box>
  );
}

export default SearchList;
