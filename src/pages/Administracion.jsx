import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Table,
  Spinner,
  Image,
  Modal
} from 'react-bootstrap';

const Administracion = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    price: '',
    offer: false
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/book');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (login(username, password)) {
      setUsername('');
      setPassword('');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.image || !formData.price) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        'https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/book',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      if (res.ok) {
        fetchProducts();
        setFormData({ title: '', author: '', image: '', price: '', offer: false });
        setShowForm(false);
        alert('Producto agregado exitosamente');
      }

    } catch (error) {
      console.error(error);
      alert('Error al agregar producto');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.image || !formData.price) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/book/${editingId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      if (res.ok) {
        fetchProducts();
        setShowForm(false);
        setEditingId(null);
        setFormData({ title: '', author: '', image: '', price: '', offer: false });
        alert('Producto actualizado correctamente');
      }

    } catch (error) {
      console.error(error);
      alert('Error al editar producto');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/book/${id}`,
        { method: 'DELETE' }
      );

      if (res.ok) {
        fetchProducts();
        alert('Producto eliminado');
      }

    } catch (error) {
      console.error(error);
      alert('Error al eliminar producto');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      author: product.author,
      image: product.image,
      price: product.price,
      offer: product.offer || false
    });
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingId(null);
    setFormData({ title: '', author: '', image: '', price: '', offer: false });
    setShowForm(true);
  };

  /* ================= LOGIN ================= */

  if (!isLoggedIn) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card>
              <Card.Header className="bg-primary text-white text-center">
                <h3 className="mb-0">Administración</h3>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100">
                    Iniciar sesión
                  </Button>
                </Form>

                <Alert variant="info" className="mt-3 mb-0">
                  <strong>Credenciales de prueba</strong>
                  <br />
                  Usuario: admin
                  <br />
                  Contraseña: La404
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  /* ================= PANEL ================= */

  return (
    <Container className="py-4">

      <Row className="align-items-center mb-4">
        <Col>
          <h1>Panel de Administración</h1>
        </Col>
        <Col md="auto">
          <Button variant="danger" onClick={logout}>
            Cerrar Sesión
          </Button>
        </Col>
      </Row>

      <Alert variant="success">
        <Alert.Heading>¡Sesión iniciada!</Alert.Heading>
        Gestiona tus productos desde aquí.
      </Alert>

      <Button className="mb-4" variant="success" onClick={startAdd}>
        + Agregar nuevo producto
      </Button>

      <Modal show={showForm} onHide={() => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ title: '', author: '', image: '', price: '', offer: false });
      }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? 'Editar Producto' : 'Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={editingId ? handleEditProduct : handleAddProduct}>

            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="offer-switch"
                label="¿Es una oferta?"
                checked={formData.offer}
                onChange={(e) =>
                  setFormData({ ...formData, offer: e.target.checked })
                }
              />
            </Form.Group>

            {formData.image && (
              <div className="text-center mb-4">
                <Image
                  src={formData.image}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300?text=Error';
                  }}
                />
              </div>
            )}

            <div className="d-flex gap-2">
              <Button type="submit" disabled={loading} variant="success">
                {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Agregar'}
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ title: '', author: '', image: '', price: '', offer: false });
                }}
              >
                Cancelar
              </Button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>

      <Card>
        <Card.Header className="bg-primary text-white">
          Productos ({products.length})
        </Card.Header>

        <Card.Body>

          {loading && !showForm ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-muted">No hay productos</p>
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Precio</th>
                  <th>Oferta</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <Image
                        src={product.image}
                        style={{ height: "60px", borderRadius: 5 }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x90';
                        }}
                      />
                    </td>
                    <td><strong>{product.title}</strong></td>
                    <td>{product.author}</td>
                    <td>${product.price|| '0.00'}</td>
                    <td>{product.offer ? 'Sí' : 'No'}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => startEdit(product)}
                      >
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Administracion;
