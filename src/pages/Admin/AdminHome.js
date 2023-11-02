import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FaUser, FaBuilding, FaBriefcase, FaSignOutAlt } from 'react-icons/fa';
import Headers from '../../components/Headers';
import  "../../styles/mix.css"

function AdminHome() {
  return (
    <>
    <Headers/>
    <Navbar bg="dark" variant="dark" expand="lg" className="sidebar">
      <Container fluid>
        <Navbar.Toggle aria-controls="sidebar-nav" />
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column">
            <Link to="/admin/userlist" className="nav-link">
              <FaUser className="icon" /> Users
            </Link>
            <Link to="/admin/emplist" className="nav-link">
              <FaBuilding className="icon" /> Employer
            </Link>
            <Link to="/jobs" className="nav-link">
              <FaBriefcase className="icon" /> Jobs
            </Link>
            <button className="nav-link logout-button">
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default AdminHome;
