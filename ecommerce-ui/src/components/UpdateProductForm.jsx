import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function UpdateProductForm() {
    const [productData, setProductData] = useState({
        name: '',
        price: 0,
        description: ''
    });
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(''); 
    const { id } = useParams();

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

    const handleClose = () => setShow(false);

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
            const response = await axios.put(`https://your-api-url/products/${id}`, productData);
            if (response.status === 200) {
                setShow(true);
                setMessage('Successfully Updated Product!');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setShow(true);
            setMessage('Error Updating Product. Please Try Again');
        }
    };

    return (
        <div>
            <NavBar />
            <Form className='p-4 border rounded shadow mx-auto my-4 w-75' onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingInput" label="Name">
                    <Form.Control type="text" name='name' value={productData.name} onChange={handleChange} placeholder="Name" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Price" className="my-3">
                    <Form.Control type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Description">
                    <Form.Control as="textarea" rows={3} name="description" value={productData.description} onChange={handleChange} placeholder="Description" />
                </FloatingLabel>
                <Button type="submit" className="mt-3" variant="outline-success">Update</Button>
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

export default UpdateProductForm;