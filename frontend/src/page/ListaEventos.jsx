import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../assets/ListaEventos.css";

import Swal from 'sweetalert2';
import '@sweetalert2/themes/wordpress-admin/wordpress-admin.min.css';

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
      Swal.fire({
        title: 'Evento eliminado exitosamente',
        text: 'El evento ha sido eliminado correctamente',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false
      })
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error("Error eliminando el evento:", error);
      Swal.fire({
        title: 'Error eliminando el evento',
        text: 'Ha ocurrido un error al intentar eliminar el evento',
        icon: 'error',
        timer: 1200,
        showConfirmButton: false
      })
    }
  }

  const getRandomImage = () => {
    return imagenes[Math.floor(Math.random() * imagenes.length)];
  }

  return (
    <div className="event-list-container">
      <h1 className="title">¿Qué hay para hacer?</h1>
      {eventos.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        eventos.map((evento) => (
          <div key={evento.id} className="event-card">
            <img src={getRandomImage()} alt="Evento" />
            <div className="event-info">
              <h2>{evento.Name}</h2>
              <p>{evento.Description}</p>
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