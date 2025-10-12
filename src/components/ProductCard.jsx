import { useCart } from '../context/CartContext';
import { Card, Button, Col, Badge } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Col>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text className="text-muted">{product.author}</Card.Text>
          <div className="mt-auto">
            <Card.Text className="h5 text-success mb-3">
              {product.originalPrice ? (
                <>
                  ${product.price.toFixed(2)}
                  <small className="text-muted text-decoration-line-through ms-2">
                    ${product.originalPrice.toFixed(2)}
                  </small>
                  <Badge bg="danger" className="ms-2">
                    -{product.discount}%
                  </Badge>
                </>
              ) : (
                `$${product.price.toFixed(2)}`
              )}
            </Card.Text>
            <Button
              variant="primary"
              className="w-100"
              onClick={() => addToCart(product)}
            >
              Agregar al Carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;