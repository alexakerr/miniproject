import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// internal imports
import '../App.css'; 

function NavBar() {
    const navigate = useNavigate();
  return (
    <Navbar bg="success" data-bs-theme="dark"  >
        <Container className='ms-0'>
          <Navbar.Brand as={Link} to='/'>Yacht Shoppers</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to='/customers'>Customers</Nav.Link>
            <Nav.Link as={Link} to='/add-customer'>Add Customers</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar