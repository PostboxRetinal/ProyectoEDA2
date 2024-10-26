import { Card } from "react-bootstrap";
import "../assets/Homepage.css";
import FechaEvento from "../components/FechaEvento";
import LugarEvento from "../components/lugarEvento";
import CommentSystem from "../components/Valoraciones";
import { useParams } from "react-router-dom";

const Informacion = ({ eventos }) => {
  const { id } = useParams();
  const evento = eventos.find(evento => evento.id === id);

  if (!evento) {
    return <p>Evento no encontrado</p>;
  }

  const { nombre, descripcion, organizadorId, tipo, categoria, precio, fechaHoraInicio, fechaHoraFin, linkOnline } = evento;

  return (
    <>
      <Card style={{ width: "80rem", margin: "0 auto", marginTop: "40px" }}>
        <Card.Header>
          <h2>{nombre}</h2>
        </Card.Header>
        <Card.Body>
          <p>
            El evento hecho por: {organizadorId}. {descripcion}
          </p>
          <p>{linkOnline}</p>
          <p>categoría: {categoria}</p>
          <FechaEvento fechaHoraInicio={fechaHoraInicio} fechaHoraFin={fechaHoraFin} />
          <LugarEvento lugar={evento.lugar} />
          <p>Precio: {precio}</p>
        </Card.Body>
        <Card.Footer>
          <div>
            <span>Tipo:</span> {tipo}
          </div>
          <CommentSystem valoraciones={evento.valoraciones} />
        </Card.Footer>
      </Card>
    </>
  );
};

export default Informacion;
