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
          {/* Search bar */}
          <Form className="d-flex mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
            <FormControl
              type="search"
              placeholder="Buscar eventos"
              className="me-2"
              aria-label="Search"
              style={{
                borderRadius: '50px 0 0 50px',
                border: '1px solid #ddd',
                paddingLeft: '15px',
                flex: '1'
              }}
            />
            <FormControl
              type="text"
              placeholder="Cali, CO"
              style={{
                border: '1px solid #ddd',
                borderLeft: 'none',
                paddingLeft: '15px',
                flex: '1'
              }}
            />
          </Form>

          {/* Navigation links */}
          <Nav className="ms-auto d-flex align-items-center">
  <Nav.Link href="/" style={{ color: '#333', fontWeight: '500' }}>Español (España)</Nav.Link>

  {/* Botón para Iniciar sesión */}
  <Button href="/Login" variant="primary" style={{
    backgroundColor: '#ff8940', // Azul para diferenciarlo
    borderColor: '#ff8940',
    borderRadius: '20px',
    padding: '5px 15px',
    fontWeight: '500',
    marginRight: '10px' // Espacio entre botones
  }}>
    Iniciar sesión
  </Button>

  {/* Botón para Registrarse */}
  <Button href="/Register" variant="primary" style={{
    backgroundColor: '#FF3E57', // Rojo
    borderColor: '#FF3E57',
    borderRadius: '20px',
    padding: '5px 15px',
    fontWeight: '500'
  }}>
    Registrarse
  </Button>
</Nav>


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponente;
