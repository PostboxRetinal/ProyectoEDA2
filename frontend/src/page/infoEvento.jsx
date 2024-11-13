import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../assets/InfoEvento.css';

//imagenes
import presencial from "../assets/imagenes/Evento_image.jpg";
import virtual from "../assets/imagenes/EventoWeb_image.png";


//iconos
import { CiTimer } from "react-icons/ci";
import { MdPlace } from "react-icons/md";

const InfoEvento = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  const imagenes = [presencial, virtual];

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const eventoDoc = await getDoc(doc(db, 'Eventos', id)); // Asegúrate de que el nombre de la colección sea correcto
        if (eventoDoc.exists()) {
          setEvento(eventoDoc.data());
        } else {
          console.error('No se encontró el evento');
        }
      } catch (error) {
        console.error('Error obteniendo el evento:', error);
      }
    };
    fetchEvento();
  }, [id]);

  const getRandomImage = () => {
    return imagenes[Math.floor(Math.random() * imagenes.length)];
  }

  if (!evento) return <div>Cargando...</div>;

  return (
    <div className='Color'>
      <div className='margin'>
      <h1 className='h1'>{evento.Name}</h1>
      <div className='info-header'>
        <img src={getRandomImage()} alt="Evento" className='evento-imagen' />
        <div className='evento-date'>
          <CiTimer style={{fontSize:'50px', marginLeft:'90px'}}/>
          <p>{evento.Date}</p>
        </div>
      </div>
      <div className='info-body'>
        <p className='evento-descripcion'>{evento.Description}</p>
        <div className='evento-place'>
          <div className='lugar-icon'>
            <MdPlace />
          </div>
          <div>
            <p>{evento.Place}</p>
          </div>
        </div>
      </div>
      <div className='evento-modalidad'>
        <p>{evento.Modality}</p>
      </div>
      <a href={evento.Link} target='_blank' className='evento-masinfo'>Más información</a>
      </div>
    </div>
  );
};

export default InfoEvento;
