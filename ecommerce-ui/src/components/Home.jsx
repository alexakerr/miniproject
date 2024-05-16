import React from 'react';
import { Container, Row } from 'react-bootstrap';

// internal imports
import NavBar from './NavBar';
import '../App.css';

function Home() {
  return (
    <div>
        <NavBar />
        <Row className='home-page'>
          <Container className='w-75'>
            <h1>Welcome to our Super Cool Shopping App</h1>
            <h3>Where prices are fair and inflation hasn't quite hit us yet! You are welcome!</h3>
          </Container>
        </Row>
    </div>
  )
}

export default Home