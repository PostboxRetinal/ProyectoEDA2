import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../assets/AgregarEvento.css'; // Usa el mismo archivo CSS de AgregarEvento

const ActualizarEvento = () => {
  const { id } = useParams();
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newModality, setNewModality] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const eventoDoc = await getDoc(doc(db, "Eventos", id));
        if (eventoDoc.exists()) {
          const eventoData = eventoDoc.data();
          setNewName(eventoData.Name);
          setNewDescription(eventoData.Description);
          setNewDate(eventoData.Date);
          setNewModality(eventoData.Modality);
          setNewPlace(eventoData.Place);
          setNewLink(eventoData.Link);
        } else {
          console.error("No se encontró el evento");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvento();
  }, [id]);

  const updateEvento = async () => {
    try {
      await updateDoc(doc(db, "Eventos", id), {
        Name: newName,
        Description: newDescription,
        Date: newDate,
        Modality: newModality,
        Place: newPlace,
        Link: newLink
      });
      alert("Evento actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando el evento:", error);
      alert("Error actualizando el evento");
    }
  }

  return (
    <div className="container">
      <h1>Actualizar Evento</h1>
      <form onSubmit={(e) => { e.preventDefault(); updateEvento(); }}>
        <label>Nombre evento:</label>
        <input type="text" placeholder="Nombre" value={newName} onChange={(event) => setNewName(event.target.value)} />

        <label>Fecha y hora:</label>
        <input type="datetime-local" placeholder="Fecha y Hora" value={newDate} onChange={(event) => setNewDate(event.target.value)} />

        <label>Lugar:</label>
        <input type="text" placeholder="Lugar" value={newPlace} onChange={(event) => setNewPlace(event.target.value)} />

        <label>Link:</label>
        <input type="text" placeholder="Link" value={newLink} onChange={(event) => setNewLink(event.target.value)} />

        <label>Modality:</label>
        <select value={newModality} onChange={(event) => setNewModality(event.target.value)}>
          <option value="">Seleccionar Modalidad</option>
          <option value="virtual">Virtual</option>
          <option value="presencial">Presencial</option>
        </select>

        <label>Descripcion:</label>
        <textarea placeholder="Descripción" value={newDescription} onChange={(event) => setNewDescription(event.target.value)} />

        <button type="submit">Actualizar Evento</button>
      </form>
    </div>
  );
}

export default ActualizarEvento;
