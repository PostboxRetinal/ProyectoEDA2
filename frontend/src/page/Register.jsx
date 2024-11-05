import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import Api from "../service/Api";
import '../assets/ProjectCSS/Register.css'; // Asegúrate de importar el CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    const userData = { username, email, password };
    console.log("Sending user data:", userData);

    try {
      const response = await Api.post('/auth/register', userData);

      if (response.status === 201) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
      } else {
        alert("Hubo un problema con el registro. Inténtalo de nuevo.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(`Error en el registro: ${error.response.data.message || "Verifica la información e inténtalo de nuevo."}`);
      } else {
        alert("Error en el registro. Verifica la información e inténtalo de nuevo.");
      }
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
          <Form.Group controlId="formPassword" style={{ position: 'relative' }}>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: 15, cursor: 'pointer' }}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" style={{ position: 'relative' }}>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Repetir Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="checkbox-group">
            <Form.Check
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              label={<span>Acepto los <a href="/terms">términos de servicio</a></span>}
            />
          </div>
          <Button type="submit" className="form-button">
            Registrarse
          </Button>
        </Form>
        <div className="login-link">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
        </div>
      </div>
    </Container>
  );
};

export default Register;
