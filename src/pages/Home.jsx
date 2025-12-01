import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        'https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/book'
      );

      const data = await response.json();

      const formattedProducts = data.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        price: book.price
      }));

      setProducts(formattedProducts);

    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" />
          <p className="mt-3">Cargando libros...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">

      <h1 className="mb-4">Libros</h1>
      <p className="text-muted mb-4">
        Explora nuestra colección de {products.length} libros
      </p>

      {products.length === 0 ? (
        <Alert variant="info">
          No hay productos disponibles. Ve a Administración para agregar libros.
        </Alert>
      ) : (
        <Row xs={1} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}

    </Container>
  );
};

export default Home;
