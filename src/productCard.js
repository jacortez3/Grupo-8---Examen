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

    //Almacenar productos en la tabla Buy sacando los datos de la tabla products
    async function ProductBuy(product) {
        try {
            const { data, error } = await supabase
                .from("buy")
                .insert({
                    name: product.name,
                    description: product.description,
                    price: product.price
                })
                .single()
            
            if (error) throw error;
            window.location.reload();
            alert("Producto comprado con exito \nNombre: "+product.name+"\nDescripcion: "+product.description+"\nPrecio: "+product.price);
            
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        //Cambiar color de la letra
                        
                        <Card.Title style={{ color: '#ff0080' }}>{product.name}</Card.Title>
                        <Card.Text style={{ color: '#005a9c' }}>{product.description}</Card.Text>
                        <Card.Text style={{ color: '#ff0080' }}>${product.price}</Card.Text>
                        <Button variant="danger" onClick={() => deleteProduct()}>Eliminar</Button>
                        <Button variant="secondary" onClick={() => setEditing(true)}>Editar</Button>
                        <Button variant="primary" onClick={() => ProductBuy(product)}>Comprar</Button>

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