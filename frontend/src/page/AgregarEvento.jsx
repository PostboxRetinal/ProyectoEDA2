import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import '../assets/AgregarEvento.css';

import Swal from 'sweetalert2';
import '@sweetalert2/themes/wordpress-admin/wordpress-admin.min.css';

const AgregarEvento = () => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newModality, setNewModality] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [newLink, setNewLink] = useState('');

  const eventoCollectionRef = collection(db, 'Eventos');

  const addEvento = async () => {
    try {
      await addDoc(eventoCollectionRef, {
        Name: newName,
        Description: newDescription,
        Date: newDate,
        Modality: newModality,
        Place: newPlace,
        Link: newLink
      });
      Swal.fire({
        title: 'Evento agregado exitosamente',
        text: 'El evento ha sido agregado correctamente',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false
      });
      setNewName('');
      setNewDescription('');
      setNewDate('');
      setNewModality('');
      setNewPlace('');
      setNewLink('');
    } catch (error) {
      console.error("Error agregando el evento:", error);
      Swal.fire({
        title: 'Error al agregar el evento',
        text: 'Ha ocurrido un error al intentar agregar el evento',
        icon: 'error',
        timer: 1200,
        showConfirmButton: false
      })
    }
  }

  return (
    <div className="container">
      <h1>Nuevo evento</h1>
      <form onSubmit={(e) => { e.preventDefault(); addEvento(); }}>
        <label>Nombre evento:</label>
        <input type="text" placeholder="Nombre" value={newName} onChange={(event) => setNewName(event.target.value)} />

        <label>Fecha y hora:</label>
        <input type="datetime-local" placeholder="Fecha y Hora" value={newDate} onChange={(event) => setNewDate(event.target.value)} />

        <label>Lugar:</label>
        <input type="text" placeholder="Lugar" value={newPlace} onChange={(event) => setNewPlace(event.target.value)} />

        <label>Link:</label>
        <input type="text" placeholder="Link" value={newLink} onChange={(event) => setNewLink(event.target.value)} />

        <label>Modalidad:</label>
        <select value={newModality} onChange={(event) => setNewModality(event.target.value)}>
          <option value="">Seleccionar Modalidad</option>
          <option value="Virtual">Virtual</option>
          <option value="Presencial">Presencial</option>
        </select>

        <label>Descripcion:</label>
        <textarea placeholder="Descripción" maxLength={400} value={newDescription} onChange={(event) => setNewDescription(event.target.value)} />

        <button type="submit">Añadir Evento</button>
      </form>
    </div>
  );
}

export default AgregarEvento;
