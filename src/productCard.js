import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';
import jsPDF from 'jspdf';

function ProductCard(props) {
    const product = props.product;

    const [ editing, setEditing ] = useState(false);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ price, setPrice ] = useState(product.price);

    async function updateProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .update({
                    name: name,
                    description: description,
                    price: price
                })
                .eq("id", product.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    //Imprimir en PDF
    const generatePdf = async () => {
        const doc = new jsPDF();
        //Colocar una imagen en una esquina y con un tamaño de 50x50
        
        doc.text(`GRUPO 8`, 100, 10);
        doc.text(`Integrantes:`, 10, 20);
        doc.text(`Dayana Anchapaxi, Jonathan Cortez, Luciana Guerra`, 10, 30);

        doc.text(`Nombre: ${product.name}`, 10, 50);
        doc.text(`Descripción: ${product.description}`, 10, 60);
        doc.text(`Precio: $${product.price}`, 10, 70);
        doc.save(`producto-${product.name}.pdf`);
    };
    

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>${product.price}</Card.Text>
                        <Button variant="danger" onClick={() => deleteProduct()}>Eliminar</Button>
                        <Button variant="secondary" onClick={() => setEditing(true)}>Editar</Button>
                        <Button onClick={generatePdf}>Imprimir PDF</Button>
                        <Button onClick={ProductCard}>Carrito</Button>

                    </>
                :
                    <>
                        <h4>Editar Producto</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>Regresar</Button>
                        <br></br>
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            defaultValue={product.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Descripcion del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            defaultValue={product.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Form.Label>Precios del Producto</Form.Label>
                        <Form.Control
                            type="number"
                            id="price"
                            defaultValue={product.price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateProduct()}>Actualizar</Button>
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default ProductCard;