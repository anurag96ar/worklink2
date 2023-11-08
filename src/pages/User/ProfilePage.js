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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import moment from "moment"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import { instance } from "../../services/axiosInterceptor";



const ProfilePage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState(null);
  const [modal,setModal]= useState(false)
  const [image, setImage] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('B.Com'); // Default to 'B.Com'

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [post, setPost] = useState("");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [connectionData, setConnectionData] = useState(0);


  const getUser = async () => {
    try {
      const response = await instance.get(`/users/${userId}`);
      const data = response.data;
      setUser(data);
      dispatch(
        setLogin({
          user: data,
          token: token,
        })
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  const getConnection = async () => {
    const formData = new FormData();
    formData.append("email", email);
   

    var data = await instance.post(
      "/users/myConnections",
      formData,
      {
        headers: {
          
          "Content-Type": "application/json",
        },
      }
    );
    setConnectionData(data.data.length);
    
  };

 

  useEffect(() => {
    getUser();
    getConnection();

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
      const response = await instance.post(
        "/uploadProfile",
        
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
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

  const handleEdit = async () =>{
    setModal(true)
    setShow(true);
  }
  const handleSubmit = async () =>{
    const formData = new FormData();
        formData.append("email", email);
        formData.append("education", selectedOption);
        formData.append("fromDate", fromDate);
        formData.append("toDate", toDate);

      const response = await instance.post(`/users/profile/${userId}`,formData, {
        headers: {
          
          'Content-Type': 'application/json'
        },
      });
     
      setShow(false)
      if(response.status===200){
        toast.success("Updated")
      }
  }


  // Default to '1'

 

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
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
              handleProfile(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                p="1rem"
                width="100%"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                <UserImage size="200px" image={user.picturePath} />
              </Box>
            )}
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
          {modal && (  <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Recent Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recent Job"
                value={user.recentJob}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Employment Type </Form.Label>
              <Form.Control
                type="text"
                placeholder="Employment Type"
                value={user.employementType}
                autoFocus
              />
            </Form.Group>
           
            <Form.Label>Work Experience </Form.Label>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
       
      <Form.Label>From Date :</Form.Label>
<DatePicker
  selected={fromDate}
  onChange={handleFromDateChange}
  dateFormat="MM/yyyy"
  showMonthYearPicker // This allows selecting only month and year
  placeholderText="MM/yyyy"
/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
      <Form.Label>To Date :</Form.Label>
<DatePicker
  selected={toDate}
  onChange={handleToDateChange}
  dateFormat="MM/yyyy"
  showMonthYearPicker // This allows selecting only month and year
  placeholderText="MM/yyyy"
/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
        <Form.Label>Select Education</Form.Label>
        <Form.Select value={selectedOption} onChange={handleOptionChange}>
          <option value="B.Com">B.Com</option>
          <option value="BSc">BSc</option>
          <option value="BE">BE</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="B.Tech">B.Tech</option>
        </Form.Select>
      </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>)}
          <WidgetWrapper width="80%" style={{ position: "relative" }}>
            <EditOutlined
            onClick={()=>handleEdit(userId)}
              style={{ position: "absolute", top: "10px", right: "20px" }}
            />
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
            <Typography variant="h5" padding="10px">
            Work Experience: {moment(user.fromDate).format("MMM YYYY")} - {moment(user.toDate).format("MMM YYYY")}
            </Typography>
            <Typography variant="h5" padding="10px">
             Education: {user.education}
            </Typography>
            <Box padding="10px" display={isNonMobileScreens ? "flex" : "block"}>
              <Typography variant="h5">{user.location}, India</Typography>
              <Typography variant="h6" paddingLeft="10px" color="#088395">
                Contact info
              </Typography>
            </Box>
            <Typography color="#176B87" variant="h5" paddingLeft="10px">
              {" "}
              {connectionData}  connections
            </Typography>
          </WidgetWrapper>

          <Box m="2rem 0" />
          {/* <FriendListWidget userId={userId} /> */}
          <Box width="80%">
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default ProfilePage;
