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
import Headers from "../../components/Headers";
import PostWidget from "../User/PostWidget";
import { instance } from "../../services/axiosInterceptor";
import EmpNavbar from "../../components/EmpNavbar";


const EmpUserDetails = () => {
    const  state = useLocation();
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [posts, setPostData] = useState([]);

  const dispatch = useDispatch();
  const  email  = useSelector((state) => state.user);
  // const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  
  const [userMail,setUserMail]=useState("")
  const [userId,setUserId]=useState("")


 
    const getUser = async () => {
      console.log(userMail,"detail page email");
      const formData = new FormData();
      formData.append("email",userMail );
      console.log(formData);
    const response = await instance.post(`/admin/usersdetails`,formData,
    {
      headers: {
       
        'Content-Type': 'application/json'
      },
    },)

      
      setUser(response.data)
     


    };
    

    useEffect(() => {
      const userEmail= localStorage.getItem("userEmail")
      setUserMail(userEmail)
      const userId= localStorage.getItem("userId")
      setUserId(userId)
      
      
      getUser();
    }, [userMail,userId]); // eslint-disable-line react-hooks/exhaustive-deps

    console.log(userId,"this this this");
  if (!user) return null;

  function CallBack(data){
    getUser();
  }



  

  return (
    <Box>
      <EmpNavbar/>
      <Box paddingTop="180px"></Box>
      {user.map((user)=>(

      
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {" "}
        <Box width="40%" justifyContent="center" textAlign="-webkit-center">
         
          
           <Box>
                    
                    <UserImage size="200px" image={user.picturePath} />
                  
                  </Box>
         
          <Typography
            variant="h3"
            color={dark}
            fontWeight="500"
            justifyContent="center"
            padding="10px"
          >
            {user.firstName} {user.lastName}
          </Typography>
          <Typography color={medium}>{user.recentJob}</Typography>
        </Box>
        <Box flexBasis={isNonMobileScreens ? "100%" : undefined}>
          <WidgetWrapper width="80%">
            <Typography variant="h4" padding="10px">
              {" "}
              About
            </Typography>
            <Typography variant="h5" padding="10px">
              {user.recentJob}
            </Typography>
            <Typography paddingLeft="10px" color={medium}>
              {user.employementType}
            </Typography>

            <Box padding="10px" display={isNonMobileScreens ? "flex" : "block"}>
              <Typography variant="h5">{user.location},India</Typography>

              <Typography variant="h6" paddingLeft="10px" color="#088395">
                Contact info
              </Typography>
            </Box>
            <Typography color="#176B87" variant="h5" paddingLeft="10px">
              {" "}
              {user.friends.length} connections
            </Typography>
          </WidgetWrapper>
          <Box m="2rem 0" />
        </Box>
      </Box>
      ))}
     
       
   

    </Box>
    
  );
};

export default EmpUserDetails;
