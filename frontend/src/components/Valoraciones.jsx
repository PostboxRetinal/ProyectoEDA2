import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

const ratingOptions = ['Malo', 'Regular', 'Bueno', 'Excelente'];

const CommentForm = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState({ username: '', rating: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.username && newComment.rating && newComment.content) {
      onSubmit(newComment);
      setNewComment({ username: '', rating: '', content: '' });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm mb-4">
      <h4 className="text-center mb-4">Deja tu comentario</h4>

      <Form.Group controlId="username" className="mb-3">
        <Form.Label>Nombre de Usuario</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={newComment.username}
          onChange={handleInputChange}
          required
          placeholder="Ingresa tu nombre"
        />
      </Form.Group>

      <Form.Group controlId="rating" className="mb-3">
        <Form.Label>Calificación</Form.Label>
        <div className="d-flex justify-content-around">
          {ratingOptions.map(option => (
            <Form.Check
              inline
              key={option}
              type="radio"
              label={option.charAt(0).toUpperCase() + option.slice(1)}
              name="rating"
              value={option}
              checked={newComment.rating === option}
              onChange={handleInputChange}
              required
            />
          ))}
        </div>
      </Form.Group>

      <Form.Group controlId="content" className="mb-3">
        <Form.Label>Comentario</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={newComment.content}
          onChange={handleInputChange}
          rows={3}
          required
          placeholder="Escribe aquí tu opinión..."
        />
      </Form.Group>

      <Button type="submit" variant="danger" className="w-100">
        Enviar Comentario
      </Button>
    </Form>
  );
};

const CommentList = ({ comments }) => (
  <div className="mt-4">
    {comments.map(comment => (
      <Card key={comment.id} className="mb-3 shadow-sm rounded border-0" style={{ backgroundColor: '#f8f9fa' }}>
        <Card.Body>
          <Row className="justify-content-between align-items-center mb-2">
            <Col xs="auto">
              <h6 className="mb-0">{comment.username}</h6>
            </Col>
            <Col xs="auto">
              <Badge bg={getBadgeColor(comment.rating)}>{comment.rating.charAt(0).toUpperCase() + comment.rating.slice(1)}</Badge>
            </Col>
          </Row>
          <Card.Text className="mt-2">{comment.content}</Card.Text>
        </Card.Body>
      </Card>
    ))}
  </div>
);

// Función para asignar colores a las etiquetas de calificación
const getBadgeColor = (rating) => {
  switch (rating) {
    case 'excelente':
      return 'success';
    case 'bueno':
      return 'primary';
    case 'regular':
      return 'warning';
    case 'malo':
      return 'danger';
    default:
      return 'secondary';
  }
};

const CommentSystem = ({ title = "Comentarios sobre este evento" }) => {
  const [comments, setComments] = useState([
    { id: 1, username: "María", rating: "excelente", content: "¡El evento estuvo increíble! Muy bien organizado." },
    { id: 2, username: "Juan", rating: "bueno", content: "Me gustó mucho, aunque el sonido podría mejorar." },
    { id: 3, username: "Ana", rating: "regular", content: "Esperaba más variedad en las actividades." }
  ]);

  const handleAddComment = (newComment) => {
    setComments(prev => [...prev, { ...newComment, id: Date.now() }]);
  };

  return (
    <div className="comment-system container my-5 p-4 bg-white rounded shadow-lg">
      <h2 className="text-center text-danger mb-4">{title}</h2>
      <CommentForm onSubmit={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSystem;
