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
      id: '001',
      nombre: 'Evento de Prueba',
      descripcion: 'Este es un evento de prueba.',
      organizadorId: 'Organizador 1',
      tipo: 'Presencial',
      fechaHoraInicio: '2023-10-01T10:00',
      fechaHoraFin: '2023-10-01T12:00',
      lugar: 'Lugar de Prueba',
      precio: '100',
      linkOnline: 'http://example.com'
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
