import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';

import AdminHeaders from '../../components/AdminHeader';
import "../../styles/mix.css"
import Card from 'react-bootstrap/Card';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { instance } from "../../services/axiosInterceptor";


function AdminHome() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalJob, setTotalJob] = useState(0);
  const [totalAppliedJob, setTotalAppliedJob] = useState(0);
  const [totalBlockedUser, setBlockedUser] = useState(0);
  const [totalBlockedPost, setBlockedPost] = useState(0);
  const token = useSelector((state) => state.token);



  const data = [
    ["Task", "Hours per Day"],
    ["Employee", totalUser],
    ["Blocked User", totalBlockedUser],
    ["Total Jobs", totalJob],
    ["Applied Jobs", totalAppliedJob],

    ["BlockedPosts", totalBlockedPost]
  ];

  const options = {
    title: "Job Portal ",
  };



  useEffect(() => {


    instance
      .get("/admin/userslist")
      .then((response) => {
        // Check if the response data is an array before setting the state
        console.log(response.data);

        setTotalUser(response.data.length);


      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });////

    instance
      .get("/admin/blockedPost")
      .then((response) => {
        // Check if the response data is an array before setting the state
        console.log(response.data);

        setBlockedPost(response.data.length);


      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    ///////
    instance
      .get("/admin/appliedJobs")
      .then((response) => {
        // Check if the response data is an array before setting the state
        console.log(response.data);

        setTotalAppliedJob(response.data.length);


      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    /////

    instance
      .get("/admin/blockedUser")
      .then((response) => {
        // Check if the response data is an array before setting the state
        console.log(response.data);

        setBlockedUser(response.data.length);


      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    ////////////
    instance
      .post("/users/joblist", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Check if the response data is an array before setting the state
        // console.log(response.data);

        setTotalJob(response.data.length);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  return (
    <div className="dashboard">
      <AdminHeaders />

      <Box display="flex" padding="10px">
        <Container>
          <div className="rounded-card-container">
            <Card className="rounded-card">
              <Card.Body>
                <Card.Title>Total Employee</Card.Title>
                <Card.Text>
                  {totalUser}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>
        <Container>
          <div className="rounded-card-container">
            <Card className="rounded-card">
              <Card.Body>
                <Card.Title>Blocked Employee</Card.Title>
                <Card.Text>
                  {totalBlockedUser}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>
        <Container>
          <div className="rounded-card-container">
            <Card className="rounded-card">
              <Card.Body>
                <Card.Title>Jobs Applied</Card.Title>
                <Card.Text>
                  {totalAppliedJob}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>
        <Container>
          <div className="rounded-card-container">
            <Card className="rounded-card">
              <Card.Body>
                <Card.Title>Total Jobs Created</Card.Title>
                <Card.Text>
                  {totalJob}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>

      </Box>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"500px"}
      />

    </div>

  );
}

export default AdminHome;
