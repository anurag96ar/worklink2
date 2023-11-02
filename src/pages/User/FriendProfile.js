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
import MyPostWidget from "./MyPostWidget";
import PostsWidget from "./PostsWidget";
import UserProfile from "./UserProfile";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setLogin } from "../../state/state";

const FriendProfile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [post, setPost] = useState("");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const token = useSelector((state) => state.token);

 
  const getUser = async () => {
    console.log(userId,"user usuer uereurer");
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const handleProfile = async (data) => {
    const formData = new FormData();
    formData.append("email", email);
    if (data) {
      formData.append("picture", data);
      formData.append("picturePath", data.name);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/uploadProfile",
        formData,
      );

      const posts = response.data;
      getUser();
      dispatch(setPost({ posts }));
      setImage(null);
      setPost("");
      toast.success("Post created successfully");
   

    } catch (error) {
      // Handle errors here
      console.error("Error uploading post:", error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box paddingTop="100px"></Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {" "}
        <Box width="40%" justifyContent="center" textAlign="-webkit-center">
         
          
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop= { (acceptedFiles)  =>{ setImage(acceptedFiles[0])
            handleProfile(acceptedFiles[0])
            }}
          >
            {({ getRootProps, getInputProps }) => ( <Box
                    {...getRootProps()}
                   
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    <UserImage size="200px" image={user.picturePath} />
                  
                  </Box>)}
          </Dropzone>
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
          {/* <FriendListWidget userId={userId} /> */}
          <Box width="80%">
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FriendProfile;
