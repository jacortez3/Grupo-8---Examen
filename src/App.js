import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import { supabase } from './supabaseClient';


// IEVMMvL3YM3zbOu4

// Create the user interface (Navbar, Form to create products, product card)
// Setup supabase, create a table for our products
// Implement the CRUD logic for the products

function App() {
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ products, setProducts] = useState([]);
  

  console.log(name);
  console.log(description);
  console.log(price);

  useEffect(() => {
    getProducts();
  }, [])

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
      if (error) throw error;
      if (data != null) {
        setProducts(data); // [product1,product2,product3]
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function addProductQuantity(id, quantity) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({ quantity: supabase.raw('quantity + ' + quantity) })
        .eq('id', id)
        .single();
      if (error) throw error;
      await getProducts();
    } catch (error) {
      alert(error.message);
    }
  }

  async function subtractProductQuantity(id, quantity) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({ quantity: supabase.raw('quantity - ' + quantity) })
        .eq('id', id)
        .single();
      if (error) throw error;
      await getProducts();
    } catch (error) {
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name,
          description: description,
          price: price
        })
        .single()
        
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  console.log(products);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>Tienda de Productos</Navbar.Brand>
          <Nav>
            <Nav.Item>Grupo 8</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Crear Productos</h3>
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Descripcion del Producto</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Label>Precio del Producto</Form.Label>
            <Form.Control
              type="number"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <br></br>
            <Button onClick={() => createProduct()}>Crear</Button>
          </Col>

          <Col xs={12} md={4}>
            <h3>Buscar Productos</h3>
            <Form.Control
              type="text"
              id="searchTerm"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </Col>
        </Row>
        <hr></hr>
        <h3>Productos</h3>
        <Row xs={1} lg={3} className="g-4">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm)
            ).map((product) => (
            <Col>
              <ProductCard product={product} 
              onAddQuantity={() => addProductQuantity(product.id, 1)}
              onSubtractQuantity={() => subtractProductQuantity(product.id, 1)}/> 
              
            </Col>
          ))}
        </Row>

        
      </Container>
    </>
  );
}

export default App;
