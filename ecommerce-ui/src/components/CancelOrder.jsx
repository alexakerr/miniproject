import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function OrderDetails() {
    const [order, setOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
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

    const handleCancel = async () => {
        try {
            await axios.delete(`https://api.soycandlenyc.com/orders/${id}`);
            setShowModal(true);
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // brings customer to the page after canceling a order.
        history.push('/orders');
    };

    return (
        <div>
            <NavBar />
            {order ? (
                <Card className="mx-auto my-4 w-75">
                    <Card.Header>Order Details</Card.Header>
                    <Card.Body>
                    <Card.Title>Order ID: {order.id}</Card.Title>
                       <Card.Subtitle className="mb-2 text-muted">Order Date: {order.orderDate}</Card.Subtitle>
                        {order.products.length > 0 ? (
                            <ul>
                                {order.products.map((product, index) => (
                     <li key={index}>Product {index + 1}: {product}</li>
                               ))}
                            </ul>
                        ) : (
                            <p>No products in this order.</p>
                        )}
                        <Button variant="danger" onClick={handleCancel}>Cancel Order</Button>
                    </Card.Body>
                </Card>
            ) : (
                <div>Loading...</div>
            )}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Canceled</Modal.Title>
                </Modal.Header>
                <Modal.Body>The order has been successfully canceled.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OrderDetails;