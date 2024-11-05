import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./page/HomePage";
import Informacion from "./page/infoEvento";
import IniciarSesion from "./page/Login";
import Registro from "./page/Register";
import Layout from "./Layouts/Layout";
import AgregarEvento from "./page/AgregarEvento";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ProtectedRoute from "../src/components/ProtectedRoute";

const App = () => {
  const [eventos, setEventos] = useState([]);

  const agregarEvento = (nuevoEvento) => {
    setEventos([...eventos, nuevoEvento]);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage eventos={eventos} />} />
          <Route path="/homePage" element={<HomePage eventos={eventos} />} />
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/infoEvento/:id" element={<Informacion eventos={eventos} />} />

          {/* Ruta protegida para agregar eventos */}
          <Route
            path="/AgregarEvento"
            element={
              <ProtectedRoute>
                <AgregarEvento onAgregarEvento={agregarEvento} />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
