import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaEventos from "./page/ListaEventos";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AgregarEvento from "./page/AgregarEvento";
import ActualizarEvento from "./page/ActualizarEvento";
import InfoEvento from "./page/infoEvento"; // Importa el nuevo componente
import './App.css'; // Asegúrate de importar el archivo CSS

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<ListaEventos />} />
          <Route path="/AgregarEvento" element={<AgregarEvento />} />
          <Route path="/ActualizarEvento/:id" element={<ActualizarEvento />} />
          <Route path="/InfoEvento/:id" element={<InfoEvento />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
