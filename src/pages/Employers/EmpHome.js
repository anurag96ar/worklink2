import React, { useEffect, useState, useRef } from "react";
import EmpNavbar from '../../components/EmpNavbar'
import axios from "axios";
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from "react-redux";
import "../../styles/mix.css"
import Card from 'react-bootstrap/Card';
import { Box } from '@mui/material';

import { Chart } from "react-google-charts";

function EmpHome() {

  const [totalJob, setTotalJob] = useState(0);
  const [totalAppliedJob, setTotalAppliedJob] = useState(0);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const data = [
    ["Task", "Hours per Day"],
    ["Job Created", totalJob],
    ["Job Applied", totalAppliedJob],

  ];

  const options = {
    title: "Job Portal ",
  };


  useEffect(() => {
    const formData = new FormData();
    formData.append("email", user.email);
    console.log(user.email, "email");
    axios
      .post("http://localhost:3001/employer/joblist", formData, {
        headers: {

          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Check if the response data is an array before setting the state
        console.log(response.data);
        setTotalJob(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .post("http://localhost:3001/employer/getJobAppliedCount", formData, {
        headers: {

          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Check if the response data is an array before setting the state
        console.log(response.data);
        setTotalAppliedJob(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <EmpNavbar />
      <Box display="flex" paddingTop="150px">
        <Container>
          <div className="rounded-card-container">
            <Card className="rounded-card">
              <Card.Body>
                <Card.Title>Job Created</Card.Title>
                <Card.Text>
                  {totalJob}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>
        <Container>
          <div className="rounded-card-container">
            <Card className="rounded-card">
              <Card.Body>
                <Card.Title>Job Applied</Card.Title>
                <Card.Text>
                  {totalAppliedJob}
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
  )
}

export default EmpHome