import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import '../assets/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { setSearchTerm } = useContext(SearchContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    navigate('/SearchBar');
  };

  return (
    <header>
      <div className="blue-bar"></div>
      <nav className="navbar">
        <a href="/" className="navbar-logo">MeetUS</a>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onChange={handleSearchChange}
          />
        </div>
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate('/login')}>Iniciar sesión</button>
          <button className="navbar-button register-button" onClick={() => navigate('/register')}>Register</button>
          <button className="navbar-button add-event-button" onClick={() => navigate('/AgregarEvento')}>Agregar Evento</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
