import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';

function buyCard(props) {
    const buy = props.buy;

    async function deleteBuy() {
        try {
            const { data, error } = await supabase
                .from("buy")
                .delete()
                .eq("id", buy.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
              
                <Card.Title style={{ color: '#ff0080' }}>{buy.name}</Card.Title>
                <Card.Text style={{ color: '#005a9c' }}>{buy.description}</Card.Text>
                <Card.Text style={{ color: '#ff0080' }}>${buy.price}</Card.Text>
                <Button variant="danger" onClick={() => deleteBuy()}>Eliminar Compra</Button>
                
            </Card.Body>
        </Card>
    )
}

export default buyCard;