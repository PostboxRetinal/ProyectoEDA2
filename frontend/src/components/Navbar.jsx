import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function NavbarComponente() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: '10px 20px' }}>
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" style={{ fontFamily: 'Cursive', fontSize: '1.5rem', color: '#ff3e57', fontWeight: 'bold' }}>
        MeetUs
          </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Login">Iniciar sesion</Nav.Link>
            <Nav.Link href="/Register">Registrarse</Nav.Link>
            <Nav.Link href="/AgregarEvento">Nuevo evento</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponente;
