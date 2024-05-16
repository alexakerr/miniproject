import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function ProductForm() {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: ''
    });
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (id) {
            fetchProductData();
        }
    }, [id]);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`https://your-api-url/products/${id}`);
            const product = response.data;
            setProductData(product);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (id) {
                response = await axios.put(`https://your-api-url/products/${id}`, productData);
                setMessage('Successfully Updated Product!');
            } else {
                response = await axios.post(`https://your-api-url/products`, productData);
                setMessage('Successfully Created New Product!');
            }
            if (response.status === 200) {
                setShow(true);
            }
        } catch (error) {
            console.error('Error processing request:', error);
            setShow(true);
            setMessage('Error Processing Your Request. Please Try Again');
        }
    };

    return (
        <div>
            <NavBar />
            <Form className='p-4 border rounded shadow mx-auto my-4 w-75' onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingInput" label="Name">
                    <Form.Control type="text" name='name' value={productData.name} onChange={handleChange} placeholder="Name" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Price">
                    <Form.Control type="text" name='price' value={productData.price} onChange={handleChange} placeholder="Price" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Description">
                    <Form.Control type="text" name='description' value={productData.description} onChange={handleChange} placeholder="Description" />
                </FloatingLabel>
                <Button type="submit" className="mt-3" variant="outline-success">Submit</Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>SUCCESS!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo! {message} </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProductForm;