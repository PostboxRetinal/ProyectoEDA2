import React, { useState } from 'react';
import '../assets/ProjectCSS/Login.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import app from '../firebase/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, ingresa tus credenciales.');
      return;
    }

    try {
      const response = await Api.post('/login', { email, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        onLogin(true);
        navigate('/');
      } else {
        alert('Error en el inicio de sesión: Token no recibido');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error en el inicio de sesión. Verifica tus credenciales e inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Password</label>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Don’t have an account? <a href="/register">Register</a></p>
        <a href="/help" className="help-link">¿Problemas para iniciar sesión?</a>
      </div>
    </div>
  );
}

export default Login;
