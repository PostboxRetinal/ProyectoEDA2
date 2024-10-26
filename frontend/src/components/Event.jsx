import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import '../assets/Eventcard.css';

const Event = ({ nombre, descripcion, organizadorId, tipo, fechaHoraInicio, fechaHoraFin, lugar, precio, valoraciones }) => {
  return (
    <Card className="cardEvent">
      <Card.Header>
        <h2 className='CE_title'>{nombre}</h2>
      </Card.Header>
      <Card.Body>
        <p className='CE_description'>El evento hecho por: {organizadorId}. {descripcion}</p>
        <p><strong>Fecha y Hora de Inicio:</strong> {fechaHoraInicio}</p>
        <p><strong>Fecha y Hora de Fin:</strong> {fechaHoraFin}</p>
        <p><strong>Lugar:</strong> {lugar}</p>
        <p><strong>Precio:</strong> {precio}</p>
        <p><strong>Valoraciones:</strong> {valoraciones}</p>
        <div>
          <span className='CE_span'>Tipo:</span> {tipo}
        </div>
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
