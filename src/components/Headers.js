import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom"

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink  className=" text-light text-decoration-none"><img src="/worlinklogo.png" style={{width:50}} alt="" /></NavLink>
          
        </Container>
      </Navbar>
    </>
  )
}

export default Headers