import React from 'react'
import { useMediaQuery } from "@mui/material";
import {
  CameraAltOutlined,
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
// import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "../User/MyPostWidget";
import PostsWidget from "../User/PostsWidget";
import UserProfile from "../User/UserProfile";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setLogin } from "../../state/state";
import { useLocation } from 'react-router-dom';

function Details() {
    const [userMail,setUserMail]=useState("")
    const getUser = async () => {
        const formData = new FormData();
        formData.append("email");
        console.log(formData);
        const response = await fetch(`http://localhost:3001/admin/usersdetails`, formData, {
          method: "POST",
        });
        const data = await response.json();
        // setUser(data);
        
      };
      console.log(userMail);
    
      useEffect(() => {
        const userEmail= localStorage.getItem("email")
        setUserMail(userEmail)
        
        getUser();
      }, []);

  return (
    <div>Details</div>
  )
}

export default Details