import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../assets/Eventcard.css';

const Event = ({
  nombre = 'PyDay - Cali',
  organizadorId = 'PyDay',
  tipo = 'presencial',
  descripcion = 'En este día la comunidad de Python vendrá a Cali para darnos una demostración de sus nuevas tecnologías',
  fechaHoraInicio = '8am, 19/10/24',
  fechaHoraFin = '5pm, 19/10/24',
  lugar = 'Universidad Autónoma del occidente',
  precio = 'no aplica',
  valoraciones = 'Excelente',
  imagen = 'https://cosasdedevs.com/media/sections/images/python.png'
}) => {
  return (
    <Card className="cardEvent">
      <img src={imagen} alt="Imagen del evento" className="event-image" />
      <Card.Body>
        <h3 className='CE_title'>{nombre}</h3>
        <p className='CE_description'>Organizado por: {organizadorId}. {descripcion}</p>
        <div className="event-details">
          <div className="event-info">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{lugar}</span>
          </div>
          <div className="event-info">
            <FontAwesomeIcon icon={faClock} />
            <span>Inicio: {fechaHoraInicio}</span>
          </div>
          <div className="event-info">
            <FontAwesomeIcon icon={faClock} />
            <span>Fin: {fechaHoraFin}</span>
          </div>
          <div className="event-info">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Tipo: {tipo}</span>
          </div>
          <div className="event-info">
            <FontAwesomeIcon icon={faUsers} />
            <span>Valoración: {valoraciones}</span>
          </div>
          <div className="event-info">
            <span>Precio: {precio}</span>
          </div>
        </div>
      </Card.Body>
      <Button variant="outline-danger" href='/infoEvento'>Info Evento</Button>
    </Card>
  );
};

export default Event;
