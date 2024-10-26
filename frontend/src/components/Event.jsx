import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import '../assets/Eventcard.css';

const Event = ({ nombre, descripcion, organizadorId, tipo, fechaHoraInicio, fechaHoraFin, lugar, precio, linkOnline }) => {
  return (
    <Card className="cardEvent">
      <Card.Header>
        <h2 className='CE_title'>{nombre}</h2>
      </Card.Header>
      <Card.Body>
      <p className='CE_description'>El evento hecho por: {organizadorId}. {descripcion}</p>
        <p><strong>Modalidad:</strong> {tipo}</p>
        <p><strong>Fecha y Hora de Inicio:</strong> {fechaHoraInicio}</p>
        <p><strong>Fecha y Hora de Fin:</strong> {fechaHoraFin}</p>
        <p><strong>Lugar:</strong> {lugar}</p>
        <p><strong>Precio:</strong> {precio}</p>
        <p><strong>Link Online:</strong> <a href={linkOnline}>{linkOnline}</a></p>
      </Card.Body>
      <Card.Footer>
        <br />
        <br />
        <br />
      </Card.Footer>
    </Card>
  );
};

export default Event;
