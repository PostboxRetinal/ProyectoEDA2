import React, { useState } from 'react';

const AgregarEvento = ({ onAgregarEvento }) => {
  const [evento, setEvento] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    organizadorId: '',
    tipo: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    lugar: '',
    precio: '',
    linkOnline: ''
  });

  const [eventosNuevos, setEventosNuevos] = useState([]);

  const generateId = () => {
    return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({
      ...evento,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = generateId();
    const newEvento = { ...evento, id: newId };
    onAgregarEvento(newEvento);
    console.log(newEvento);
  };

  return (
    <div>
      <h1>Agregar Evento</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={evento.nombre} onChange={handleChange} />
        <input type="text" name="descripcion" placeholder="Descripción" value={evento.descripcion} onChange={handleChange} />
        <input type="text" name="organizadorId" placeholder="Organizador ID" value={evento.organizadorId} onChange={handleChange} />
        <select name="tipo" value={evento.tipo} onChange={handleChange}>
          <option value="">Seleccionar Modalidad</option>
          <option value="virtual">Virtual</option>
          <option value="presencial">Presencial</option>
        </select>
        <input type="datetime-local" name="fechaHoraInicio" placeholder="Fecha y Hora de Inicio" value={evento.fechaHoraInicio} onChange={handleChange} />
        <input type="datetime-local" name="fechaHoraFin" placeholder="Fecha y Hora de Fin" value={evento.fechaHoraFin} onChange={handleChange} />
        <input type="text" name="lugar" placeholder="Lugar" value={evento.lugar} onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" value={evento.precio} onChange={handleChange} />
        <input type="text" name="linkOnline" placeholder="Link Online" value={evento.linkOnline} onChange={handleChange} />
        <button type="submit">Agregar Evento</button>
      </form>
    </div>
  );
};

export default AgregarEvento;
