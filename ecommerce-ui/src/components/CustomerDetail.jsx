import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function CustomerDetail() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchCustomer();
    }, [id]);

    const fetchCustomer = async () => {
        try {
            const response = await axios.get(`https://your-api-url/customers/${id}`);
            setCustomer(response.data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://your-api-url/customers/${id}`);
            setMessage('Customer deleted successfully!');
            setShowModal(true);
        } catch (error) {
            console.error('Error deleting customer:', error);
            setMessage('Error deleting customer. Please try again.');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        history.push('/customer-list'); // Redirect to customer list after deletion
    };

    return (
        <div>
            <NavBar />
            <Container>
                {customer && (
                    <div>
                        <h2>Customer Details</h2>
                        <p>Name: {customer.name}</p>
                        <p>Phone: {customer.phone}</p>
                        <p>Email: {customer.email}</p>
                        <Button variant="danger" onClick={handleDelete}>Delete Customer</Button>
                    </div>
                )}
            </Container>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CustomerDetail;