import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);

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
      evento.Name && evento.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Resultados filtrados:", results);
    setFilteredEventos(results);
  }, [searchTerm, eventos]);

  return (
    <div style={{ margin: '20px' }}>
      <input
        type="text"
        placeholder="Buscar eventos por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <div>
        {filteredEventos.map((evento) => (
          <div key={evento.id} style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '10px'
          }}>
            <h2>{evento.Name}</h2>
            <p>{evento.Description}</p>
            <p>{evento.Date}</p>
            <p>{evento.Modality}</p>
            <p>{evento.Place}</p>
            <a href={evento.Link}>Más información</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
