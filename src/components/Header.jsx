import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';

const Header = () => {
  const { getCartItemsCount } = useCart();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Libreria "La 404" 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/ofertas">
              Ofertas
            </Nav.Link>
            <Nav.Link as={Link} to="/administracion">
              Administración
            </Nav.Link>
          </Nav>
          <Button 
            as={Link} 
            to="/carrito" 
            variant="outline-light" 
            className="position-relative"
          >
            🛒
            {getCartItemsCount() > 0 && (
              <Badge 
                bg="danger" 
                className="position-absolute top-0 start-100 translate-middle"
              >
                {getCartItemsCount()}
              </Badge>
            )}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;