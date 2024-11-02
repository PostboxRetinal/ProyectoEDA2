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
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Ruta principal */}
          <Route path="/HomePage" element={<HomePage />} />
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
