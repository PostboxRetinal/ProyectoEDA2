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
    valoraciones: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({
      ...evento,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregarEvento(evento);
    console.log(evento);
  };

  return (
    <div>
      <h1>Agregar Evento</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="ID" value={evento.id} onChange={handleChange} />
        <input type="text" name="nombre" placeholder="Nombre" value={evento.nombre} onChange={handleChange} />
        <input type="text" name="descripcion" placeholder="Descripción" value={evento.descripcion} onChange={handleChange} />
        <input type="text" name="organizadorId" placeholder="Organizador ID" value={evento.organizadorId} onChange={handleChange} />
        <input type="text" name="modalidad" placeholder="Modalidad" value={evento.tipo} onChange={handleChange} />
        <input type="datetime-local" name="fechaHoraInicio" placeholder="Fecha y Hora de Inicio" value={evento.fechaHoraInicio} onChange={handleChange} />
        <input type="datetime-local" name="fechaHoraFin" placeholder="Fecha y Hora de Fin" value={evento.fechaHoraFin} onChange={handleChange} />
        <input type="text" name="lugar" placeholder="Lugar" value={evento.lugar} onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" value={evento.precio} onChange={handleChange} />
        <input type="number" name="valoraciones" placeholder="Valoraciones" value={evento.valoraciones} onChange={handleChange} />
        <button type="submit">Agregar Evento</button>
      </form>
    </div>
  );
};

export default AgregarEvento;
