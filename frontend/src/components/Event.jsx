import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../assets/Eventcard.css';

const Event = ({ nombre, descripcion, organizadorId, tipo, fechaHoraInicio, fechaHoraFin, lugar, precio, linkOnline }) => {
  return (
    <Card className="cardEvent">
      <img src={imagen} alt="Imagen del evento" className="event-image" />
      <Card.Body>
      <p className='CE_description'>El evento hecho por: {organizadorId}. {descripcion}</p>
        <p><strong>Modalidad:</strong> {tipo}</p>
        <p><strong>Fecha y Hora de Inicio:</strong> {fechaHoraInicio}</p>
        <p><strong>Fecha y Hora de Fin:</strong> {fechaHoraFin}</p>
        <p><strong>Lugar:</strong> {lugar}</p>
        <p><strong>Precio:</strong> {precio}</p>
        <p><strong>Link Online:</strong> <a href={linkOnline}>{linkOnline}</a></p>
      </Card.Body>
      <Button variant="outline-danger" href='/infoEvento'>Info Evento</Button>
    </Card>
  );
};

export default Event;
