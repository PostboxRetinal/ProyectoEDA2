import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Event from './Event';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CarouselEvents({ eventos }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {eventos.map((evento, idx) => (
        <Carousel.Item key={idx}>
          <Event {...evento} />
          <Carousel.Caption>
            <Link to={`/infoEvento/${evento.id}`}>
              <Button variant="outline-danger" style={{width:'20%', margin:'0 auto'}}>infoEvento</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselEvents;
