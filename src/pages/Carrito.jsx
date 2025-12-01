import { useCart } from '../context/CartContext';
import { Container, Row, Col, Card, Button, InputGroup, Form, Badge, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

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

  const handleCheckout = async () => {
    setShowCheckout(true);
    setIsProcessing(true);

    // Simulacion de pago para flashearla 
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsProcessing(false);
    setPurchaseComplete(true);
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    setPurchaseComplete(false);
    clearCart();
  };

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
                    <p className="mb-0 fw-bold">${item.price}</p>
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
                <span>${getCartTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">${getCartTotal()}</strong>
              </div>
              <Button variant="success" className="w-100 mb-2" onClick={handleCheckout}>
                Proceder al Pago
              </Button>
              <Button as={Link} to="/" variant="outline-secondary" className="w-100">
                Continuar Comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showCheckout} onHide={handleCloseModal} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center py-5">
          {isProcessing ? (
            <>
              <Spinner animation="border" variant="primary" className="mb-3" />
              <h5>Procesando tu compra...</h5>
              <p className="text-muted">Por favor espera mientras procesamos tu pago</p>
            </>
          ) : purchaseComplete ? (
            <>
              <div className="mb-3 text-success" style={{ fontSize: '3rem' }}>
                ✓
              </div>
              <h5>¡Compra Exitosa!</h5>
              <p className="text-muted">Tu compra ha sido procesada correctamente. Te enviaremos un correo de confirmación pronto.</p>
              <Button variant="success" onClick={handleCloseModal} className="w-100">
                Continuar
              </Button>
            </>
          ) : null}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Carrito;