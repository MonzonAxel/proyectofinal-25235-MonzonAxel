import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';

const Ofertas = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffersBooks();
  }, []);

  const fetchOffersBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://openlibrary.org/subjects/fantasy.json?limit=5');
      const data = await response.json();

      const productosFormateados = data.works.map((book, index) => {
        const precioOriginal = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        const precioDescuento = Math.floor(precioOriginal * 0.5);

        return {
          id: book.key,
          title: book.title,
          author: book.authors?.[0]?.name || 'Autor desconocido',
          image: book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
            : 'https://via.placeholder.com/200x300?text=Sin+Imagen',
          price: precioDescuento,
          originalPrice: precioOriginal,
          discount: 50
        };
      });

      setProductos(productosFormateados);
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
          <Spinner animation="border" variant="danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-3">Cargando ofertas especiales...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Alert variant="danger" role="alert">
        <Alert.Heading>Ofertas Increibles - 50% OFF</Alert.Heading>
        <p className="mb-0">¡Aprovecha estas ofertas fantasticas!</p>
      </Alert>

      <h1 className="mb-4">Ofertas del Día</h1>

      <Row className="row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
        {productos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default Ofertas;