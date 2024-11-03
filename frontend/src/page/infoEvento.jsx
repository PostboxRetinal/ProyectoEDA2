import { Card } from "react-bootstrap";
import "../assets/Homepage.css";
import FechaEvento from "../components/FechaEvento";
import LugarEvento from "../components/lugarEvento";
import CommentSystem from "../components/Valoraciones";
import { useParams } from "react-router-dom";

const Informacion = ({
  nombre = "Pyday",
  descripcion = "Sin descripción disponible",
  organizadorId = "Desconocido",
  tipo = "Presencial",
  linkOnline = "No disponible",
  categoria = "Sin categoría",
  capacidadAsistentes = "No especificado",
  precio = "Gratis",
  fechaHoraInicio,
  fechaHoraFin,
  direccion = "No especificada"
}) => {
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
