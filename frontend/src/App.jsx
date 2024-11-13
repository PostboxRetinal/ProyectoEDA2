import { BrowserRouter, Routes, Route } from "react-router-dom";

//importar componentes
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

//importar paginas
import ListaEventos from "./page/ListaEventos";
import AgregarEvento from "./page/AgregarEvento";
import ActualizarEvento from "./page/ActualizarEvento";
import InfoEvento from "./page/infoEvento"; // Importa el nuevo componente

//contexto
import { SearchProvider } from "../src/Context/SearchContext";

//importar estilos
import './App.css'; // Asegúrate de importar el archivo CSS

const App = () => {
  return (
    <SearchProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<ListaEventos />} />
            <Route path="/AgregarEvento" element={<AgregarEvento />} />
            <Route path="/ActualizarEvento/:id" element={<ActualizarEvento />} />
            <Route path="/InfoEvento/:id" element={<InfoEvento />} />
            <Route path="/SearchBar" element={<SearchBar />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
