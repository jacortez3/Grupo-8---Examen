import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import BuyCard from './buyCard';
import { supabase } from './supabaseClient';
import jsPDF from 'jspdf';

function App() {
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ products, setProducts] = useState([]);
  const [ buy, setProductsBuy] = useState([]);
  
  console.log(name);
  console.log(description);
  console.log(price);

  useEffect(() => {
    getProducts();
    getProductsBuy();
  }, [])

  //Imprimir todos los productos en PDF
  async function printPDF() {
    const { data: res, error } = await supabase
      .from("buy")
      .select("*")
    if (error) throw error;
    const doc = new jsPDF();
    let y = 60;
    doc.text("FACTURA DEL GRUPO 8", 80, 10);
    doc.text("Nombres: Patricia Anchapaxi, Jonathan Cortez, Luciana Guerra", 10, 20);
    doc.text("CI: 999999999-9", 10, 30);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    doc.text("Fecha: "+today, 10, 40);
    doc.text("Nombre del producto", 10, 50);
    doc.text("Descripcion", 80, 50);
    doc.text("Precio Unitario", 120, 50);

    let total = 0;
    for (let i=0 ;i < res.length; i++) {
      doc.setFontSize(15).setTextColor('blue');
        doc.text(res[i].name, 10, y);
        doc.text(res[i].description, 80, y);
        doc.text("$"+`${res[i].price}`, 130, y);
        total += res[i].price;
        y += 10;
    }
    doc.setFontSize(15).setTextColor('red');
    doc.text("Total: $"+total, 130, y+10);
    doc.save("ProductList.pdf");
  };
  
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

  async function getProductsBuy() {
    try {
      const { data, error } = await supabase
        .from("buy")
        .select("*")
      if (error) throw error;
      if (data != null) {
        setProductsBuy(data); // [product1,product2,product3]
      }
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
  console.log(buy);

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
        
        <br></br>
        <hr></hr>
        <div class="tabs">
          <div class="tab-container">
          <div id="tab2" class="tab">
              <a href="#tab2">Compras</a>
              <div class="tab-content">
                <h2>Productos Comprados</h2>
                <br></br>
                <Button onClick={() => printPDF()}>Imprimir PDF</Button>
                <br></br>
                <br></br>
                <Row xs={1} lg={3} className="g-4">
                  {buy.map((buy) => (
                    <Col>
                      <BuyCard buy={buy} /> 
                    </Col>
                  ))}
                </Row>
              </div>
            </div> 

            <div id="tab1" class="tab">  
              <a href="#tab1">Productos</a>
              <div class="tab-content">
                <Row>
                  <Col xs={12} md={6}>
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
                    <Button onClick={() => createProduct()}>Crear Producto</Button>
                    <br></br>
                    <br></br>
                  </Col>
                  <Col xs={12} md={3}>
                    <h3>Buscar Productos</h3>
                    <Form.Control
                      type="text"
                      id="searchTerm"
                      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    />
                  </Col>
                </Row>
                <hr></hr> 
                <h3>Productos Disponibles</h3>
                <br></br>
                <Row xs={1} lg={4} className="g-3">
                  {products
                    .filter((product) =>
                      product.name.toLowerCase().includes(searchTerm)
                    ).map((product) => (
                    <Col>
                      <ProductCard product={product} /> 
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>          
        </div>
      </Container>
    </>
  );
}

export default App;
