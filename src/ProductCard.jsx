import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ProductCard({ product, onAddQuantity, onSubtractQuantity }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Precio: ${product.price}</Card.Text>
        <Card.Text>Cantidad: {product.quantity}</Card.Text>
        <Button onClick={onAddQuantity}>Agregar</Button>{' '}
        <Button onClick={onSubtractQuantity}>Quitar</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;