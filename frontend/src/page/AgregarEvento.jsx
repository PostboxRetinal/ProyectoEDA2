import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

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
      alert("Evento agregado exitosamente");
    } catch (error) {
      console.error("Error agregando el evento:", error);
      alert("Error agregando el evento");
    }
  }

  return (
    <div>
      <h1>Agregar Evento</h1>
      <form onSubmit={(e) => { e.preventDefault(); addEvento(); }}>
        <input type="text" placeholder="Nombre" onChange={(event) => setNewName(event.target.value)} />
        <input type="text" placeholder="Description" onChange={(event) => setNewDescription(event.target.value)} />
        <input type="datetime-local" placeholder="Fecha y Hora" onChange={(event) => setNewDate(event.target.value)}/>
        <select onChange={(event) => setNewModality(event.target.value)}>
          <option value="">Seleccionar Modalidad</option>
          <option value="virtual">Virtual</option>
          <option value="presencial">Presencial</option>
        </select>
        <input type="text" placeholder="Lugar" onChange={(event) => setNewPlace(event.target.value)} />
        <input type="text" placeholder="Link" onChange={(event) => setNewLink(event.target.value)} />
        <button type="submit">Agregar Evento</button>
      </form>
    </div>
  );
}

export default AgregarEvento;
