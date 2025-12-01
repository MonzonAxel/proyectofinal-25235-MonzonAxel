import { useCart } from '../context/CartContext';
import { Container, Row, Col, Card, Button, InputGroup, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Tu carrito está vacío</h2>
          <p className="text-muted">Agrega productos para comenzar tu compra</p>
          <Button as={Link} to="/" variant="primary" className="mt-3">
            Ir a la tienda
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito de Compras</h1>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              {cart.map((item) => (
                <Row key={item.id} className="mb-4 align-items-center border-bottom pb-3">
                  <Col md={2}>
                    <Card.Img
                      src={item.image}
                      alt={item.title}
                      className="rounded"
                      style={{ height: '100px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col md={4}>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="text-muted mb-0">{item.author}</p>
                  </Col>
                  <Col md={2}>
                    <p className="mb-0 fw-bold">${item.price.toFixed(2)}</p>
                  </Col>
                  <Col md={2}>
                    <InputGroup size="sm">
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Form.Control
                        type="number"
                        className="text-center"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={2} className="text-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>

          <Button variant="outline-danger" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">${getCartTotal().toFixed(2)}</strong>
              </div>
              <Button variant="success" className="w-100 mb-2">
                Proceder al Pago
              </Button>
              <Button as={Link} to="/" variant="outline-secondary" className="w-100">
                Continuar Comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;