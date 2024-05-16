import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function UpdateCustomerForm() {
    const [customerData, setCustomerData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(''); 
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchCustomerData();
        }
    }, [id]);

    const fetchCustomerData = async () => {
        try {
            const response = await axios.get(`https://your-api-url/customers/${id}`);
            const customer = response.data;
            setCustomerData(customer);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://your-api-url/customers/${id}`, customerData);
            if (response.status === 200) {
                setShow(true);
                setMessage('Successfully Updated User!');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            setShow(true);
            setMessage('Error Updating Customer. Please Try Again');
        }
    };

    return (
        <div>
            <NavBar />
            <Form className='p-4 border rounded shadow mx-auto my-4 w-75' onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingInput" label="Name">
                    <Form.Control type="text" name='name' value={customerData.name} onChange={handleChange} placeholder="Name" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Phone" className="my-3">
                    <Form.Control type="text" name="phone" value={customerData.phone} onChange={handleChange} placeholder="Phone" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Email">
                    <Form.Control type="email" name="email" value={customerData.email} onChange={handleChange} placeholder="Email" />
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

export default UpdateCustomerForm;