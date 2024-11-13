import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../assets/ListaEventos.css";

import presencial from "../assets/imagenes/Evento_image.jpg";
import virtual from "../assets/imagenes/EventoWeb_image.png";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const eventoCollectionRef = collection(db, 'Eventos');
  const navigate = useNavigate();

  const imagenes = [presencial, virtual];

  useEffect(() => {
    const getEventos = async () => {
      try {
        const data = await getDocs(eventoCollectionRef);
        const eventosData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log("Eventos obtenidos:", eventosData);
        setEventos(eventosData);
      } catch (error) {
        console.error("Error obteniendo los eventos:", error);
      }
    }
    getEventos();
  }, []);

  useEffect(() => {
    console.log("Estado de eventos actualizado:", eventos);
  }, [eventos]);

  const deleteEvento = async (id) => {
    try {
      await deleteDoc(doc(db, "Eventos", id));
      alert("Evento eliminado exitosamente");
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error("Error eliminando el evento:", error);
      alert("Error eliminando el evento");
    }
  }

  const getRandomImage = () => {
    return imagenes[Math.floor(Math.random() * imagenes.length)];
  }

  return (
    <div className="event-list-container">
      <h1>¿Qué hay para hacer?</h1>
      {eventos.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        eventos.map((evento) => (
          <div key={evento.id} className="event-card">
            <img src={getRandomImage()} alt="Evento" />
            <div className="event-info">
              <h2>{evento.Name}</h2>
              <p>{evento.Description}</p>
              <p>{evento.Date}</p>
              <p>{evento.Modality}</p>
              <p>{evento.Place}</p>
              <a href={evento.Link}>Más información</a>
            </div>
            <div className="event-buttons">
              <button className="update-button" onClick={() => navigate(`/InfoEvento/${evento.id}`)}>Saber más</button>
              <button className="update-button" onClick={() => navigate(`/ActualizarEvento/${evento.id}`)}>Actualizar</button>
              <button className="delete-button" onClick={() => deleteEvento(evento.id)}>Eliminar evento</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaEventos;
