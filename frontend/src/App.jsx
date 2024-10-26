import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./page/HomePage";
import Informacion from "./page/infoEvento";
import IniciarSesion from "./page/Login";
import Registro from "./page/Register";
import Layout from "./Layouts/Layout";

import "bootstrap/dist/css/bootstrap.min.css";

const App= () => {
   return(
    <BrowserRouter>
       <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/Login" element={<IniciarSesion />} />
          <Route path="/infoEvento" element={<Informacion />} />
          <Route path="/Register" element={<Registro />} />
          <Route path="/*" element={<Navigate to = "/"  />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
