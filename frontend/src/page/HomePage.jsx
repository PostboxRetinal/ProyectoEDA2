import "../assets/HomePage.css";
import { Card } from "react-bootstrap";
import CarouselEvents from "../components/CarouselEvents";

function HomePage({ eventos }) {
  return (
    <div className="Homepage">
      <Card className="card_homPa">
        <header className="main-header">
          <h1>MeetUs</h1>
          <p>Encuentra eventos de tu interés, conéctate con personas y participa en actividades locales y en línea.</p>
        </header>
      </Card>
      <section className="nearEvent">
        <h1>Eventos cerca de ti</h1>
        <CarouselEvents eventos={eventos} />
      </section>
      <footer className="footer">
        <p>&copy; 2024 MEETUS - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default HomePage;
