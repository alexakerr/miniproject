import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://your-api-url/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://your-api-url/products/${id}`);
            setMessage('Product deleted successfully!');
            setShowModal(true);
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage('Error deleting product. Please try again.');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        history.push('/product-catalog'); // goes back after you delete one
    };

    return (
        <div>
            <NavBar />
            <Container>
                {product && (
                    <div>
                        <h2>Product Details</h2>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <p>Description: {product.description}</p>
                        <Button variant="danger" onClick={handleDelete}>Delete Product</Button>
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

export default ProductDetail;