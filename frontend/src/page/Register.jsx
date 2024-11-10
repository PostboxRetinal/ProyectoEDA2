import { useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "bootstrap";

import app from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword || !agreeTerms) {
      alert("Por favor, completa todos los campos y acepta los términos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await Api.post('/register', { username, email, password });

      if (response.status === 201) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
      } else {
        alert("Hubo un problema con el registro. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro. Verifica la información e inténtalo de nuevo.");
    }
  };

  return (
    <Container className="register-container">
      <div className="register-form">
        <h1>Crear Cuenta</h1>
        <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
        </Form.Group>
            <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </Form.Group>
            <h4>{registrando ? "¿Tienes cuenta?" : " "}<Button variant="outline-danger" href="/Login">Iniciar sesion</Button>{' '}</h4>
            </div>

        </Container>
    </>
    );

};

export default Register;
