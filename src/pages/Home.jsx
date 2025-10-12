import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://openlibrary.org/subjects/fantasy.json?limit=25');
      const data = await response.json();

      const formattedProducts = data.works.map((book, index) => ({
        id: book.key,
        title: book.title,
        author: book.authors?.[0]?.name || 'Autor desconocido',
        image: book.cover_id
          ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
          : 'https://via.placeholder.com/200x300?text=Sin+Imagen',
        price: Math.floor(Math.random() * (50 - 10 + 1)) + 10
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
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-3">Cargando libros de fantasía...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Libros de Fantasía</h1>
      <p className="text-muted mb-4">Sumergite en nuestros libros más deseados de fantasía</p>

      <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;