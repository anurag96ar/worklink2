import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom"
import  "../styles/mix.css"
const AdminHeaders = () => {
  return (
    <>
        <Navbar bg="dark" expand="lg">
        <Container>
        <NavLink  className=" text-light text-decoration-none"><img src="/worlinklogo.png" style={{width:50}} alt="" /></NavLink>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <Nav.Link href="/admin/home" style={{color:'white'}}>Home</Nav.Link>
              <Nav.Link href="/admin/userlist" style={{color:'white'}}>User</Nav.Link>
              <Nav.Link href="/admin/emplist" style={{color:'white'}}>Employer</Nav.Link>
              <Nav.Link href="/jobs" style={{color:'white'}}>Jobs</Nav.Link>
              <button className="nav-link logout-button nav-link" style={{color:'white'}}>
              Logout
            </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminHeaders