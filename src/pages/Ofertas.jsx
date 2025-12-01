import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const Ofertas = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffersBooks();
  }, []);

  const fetchOffersBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/book"
      );

      const data = await response.json();

      const formattedProducts = data
        .filter((book) => book.offer === true)
        .map((book) => {
          const originalPrice = book.price;
          const discountPrice = Math.floor(originalPrice * 0.7);

          return {
            id: book.id,
            title: book.title,
            author: book.author,
            image: book.image,
            price: discountPrice,
            originalPrice: originalPrice,
            discount: 30,
          };
        });

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="danger" />
          <p className="mt-3">Cargando ofertas especiales...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Ofertas del Día</h1>

      {products.length === 0 ? (
        <Alert variant="info">No hay ofertas disponibles</Alert>
      ) : (
        <>
          <Alert variant="danger">
            <Alert.Heading>Ofertas Especiales - 30% OFF</Alert.Heading>
            ¡Aprovecha estas increíbles ofertas por tiempo limitado!
          </Alert>
          <Row xs={1} md={3} lg={5} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Ofertas;
