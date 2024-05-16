import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, FloatingLabel, Button, Modal, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar';

function OrderForm() {
    const [orderData, setOrderData] = useState({
        customerId: '',
        products: [],
        orderDate: '',

    });

    const [customers, setCustomers] = useState([]);
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
  
    useEffect(() => {
        
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://api.soycandlenyc.com/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setOrderData({
            ...orderData,
            [name]: value
        });
    };

    const handleProductChange = (event, index) => {
        const { value } = event.target;
        const updatedProducts = [...orderData.products];
        updatedProducts[index] = value;
        setOrderData({
            ...orderData,
            products: updatedProducts
        });
    };

    const addProductField = () => {
        setOrderData({
            ...orderData,
            products: [...orderData.products, '']
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (id) {
                response = await axios.put(`https://api.soycandlenyc.com/orders/${id}`, orderData);
                setMessage('Successfully Updated Order!');
            } else {
                response = await axios.post('https://api.soycandlenyc.com/orders', orderData);
                setMessage('Successfully Created New Order!');
            }
            if (response.status === 200) {
                setShow(true);
            } else {
                setShow(true);
                setMessage('Error! Please Try Again');
            }
        } catch (error) {
            console.error('Error:', error);
            setShow(true);
            setMessage('Error Processing. Please Try Again');
        }
    };

    return (
        <div>
            <NavBar />
            <Form className='p-4 border rounded shadow mx-auto my-4 w-75'onSubmit={handleSubmit}>
                <FloatingLabel controlId="customerId" label="Customer">
                    <Form.Select name="customerId" value={orderData.customerId} onChange={handleChange}>
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="orderDate" label="Order Date">
                    <Form.Control type="date" name="orderDate" value={orderData.orderDate} onChange={handleChange} />
                </FloatingLabel>
                <Button variant="outline-primary" onClick={addProductField} className="mt-3">Add Product</Button>
                {orderData.products.map((product, index) => (
                    <FloatingLabel key={index} controlId={`product-${index}`} label={`Product ${index + 1}`}>
                        <Form.Control type="text" value={product} onChange={(e) => handleProductChange(e, index)} />
                    </FloatingLabel>
                ))}
                <Button type="submit" className="mt-3" variant="outline-success">Place Order</Button>
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

export default OrderForm;