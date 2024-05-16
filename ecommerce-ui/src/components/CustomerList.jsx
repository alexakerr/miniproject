import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ListGroup, Button, Container } from 'react-bootstrap'; 

import '../App.css'; 
import CustomerForm from './CustomerForm';
import OrderList from './OrderList';
import NavBar from './NavBar';

export class CustomerList extends Component {

    constructor(){
        super();
        this.state = {
            customers: [],
            selectedCustomerId: null,
        }
        this.selectCustomer = this.selectCustomer.bind(this); 
    }

    componentDidMount(){

        const fetchedCustomers = [
            { id: 1, name: 'Edwin'},
            { id: 2, name: 'Alexa'},
            { id: 3, name: 'Mary'}
        ]

        this.setState({ customers: fetchedCustomers })
    }

    selectCustomer =  (id) => {
        console.log(id)
        this.setState({ selectedCustomerId: id })
        
    }
    
  
    componentWillUnmount(){
    
        console.log('CustomerList Component is being unmounted')
    }
    
    
  render() {
    
    const myCustomers = this.state.customers
    return (
        <div>
        <NavBar />
            <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
               {myCustomers.map( customer  => (
                <ListGroup.Item className="d-flex justify-content-around align-items-center"action onClick={() => this.selectCustomer(customer.id)}>
                    {customer.name}
                    <Button className='ms-4 w-50' as={Link} to={`../edit-customer/${customer.id}`} variant='outline-success'>Edit</Button>
                </ListGroup.Item>
               ))}
            </ListGroup>
            { this.state.selectedCustomerId &&
                <Container fluid className='d-flex flex-column align-items-center'>
                    <h2>Selected Customer: {this.state.selectedCustomerId}</h2> 
                    <OrderList customerId={this.state.selectedCustomerId} />
                </Container>
            }
      </div>
    )
  }
}


export default CustomerList



