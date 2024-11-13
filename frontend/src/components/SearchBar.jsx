import React, { useState, useEffect, useContext } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { SearchContext } from '../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import '../assets/SearchBar.css';

const SearchBar = () => {
  const { searchTerm } = useContext(SearchContext);
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getDocs(collection(db, 'Eventos'));
        const eventosData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log("Eventos obtenidos de Firestore:", eventosData);
        setEventos(eventosData);
        setFilteredEventos(eventosData);
      } catch (error) {
        console.error('Error obteniendo los eventos:', error);
      }
    };
    fetchEventos();
  }, []);

  useEffect(() => {
    const results = eventos.filter(evento =>
      evento.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEventos(results);
  }, [searchTerm, eventos]);

  return (
    <div className="search-bar">
      <div className="event-list">
        {filteredEventos.map((evento) => (
          <div key={evento.id} className="event-item" style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '20px'}}>
            <h2>{evento.Name}</h2>
            <p>{evento.Description}</p>
            <button className="update-button" onClick={() => navigate(`/InfoEvento/${evento.id}`)}>Saber más</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
