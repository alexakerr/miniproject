import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import NavBar from './NavBar';

function OrderDetails() {
    const [order, setOrder] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://api.soycandlenyc.com/orders/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        fetchOrderDetails();
    }, [id]);

    return (
        <div>
            <NavBar />
            {order ? (
                <Card className="mx-auto my-4 w-75">
                    <Card.Header>Order Details</Card.Header>
                    <Card.Body>
                        <Card.Title>Order ID: {order.id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Order Date: {order.orderDate}</Card.Subtitle>
                        <ListGroup>
                            {order.products.map((product, index) => (
                                <ListGroup.Item key={index}>Product {index + 1}: {product}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default OrderDetails;