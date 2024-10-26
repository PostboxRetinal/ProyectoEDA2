import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./page/HomePage";
import Informacion from "./page/infoEvento";
import IniciarSesion from "./page/Login";
import Registro from "./page/Register";
import Layout from "./Layouts/Layout";
import AgregarEvento from "./page/AgregarEvento";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const App = () => {
  const [eventos, setEventos] = useState([
    {
      id: '1',
      nombre: 'Evento de Prueba',
      descripcion: 'Este es un evento de prueba.',
      organizadorId: 'Organizador 1',
      modalidad: 'Presencial',
      fechaHoraInicio: '2023-10-01T10:00',
      fechaHoraFin: '2023-10-01T12:00',
      lugar: 'Lugar de Prueba',
      precio: '100',
      valoraciones: '5',
      linkOnline: 'http://example.com',
      categoria: 'Categoría de Prueba',
      tipo: 'Tipo de Prueba',
      capacidadAsistentes: '100'
    },
    {
      id: '2',
      nombre: 'Evento de Prueba 2',
      descripcion: 'Este es un evento de prueba 2.',
      organizadorId: 'Organizador 2',
      modalidad: 'Virtual',
      fechaHoraInicio: '2023-10-02T10:00',
      fechaHoraFin: '2023-10-02T12:00',
      lugar: 'Lugar de Prueba 2',
      precio: '200',
      valoraciones: '4',
      linkOnline: 'http://example.com',
      categoria: 'Categoría de Prueba 2',
      tipo: 'Tipo de Prueba 2',
      capacidadAsistentes: '200'
    }
  ]);

  const agregarEvento = (nuevoEvento) => {
    setEventos([...eventos, nuevoEvento]);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/Login" element={<IniciarSesion />} />
          <Route path="/infoEvento/:id" element={<Informacion eventos={eventos} />} />
          <Route path="/Register" element={<Registro />} />
          <Route path="/AgregarEvento" element={<AgregarEvento onAgregarEvento={agregarEvento} />} />
          <Route path="/" element={<HomePage eventos={eventos} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
