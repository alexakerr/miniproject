import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Container } from 'react-bootstrap'; 
import '../App.css'; 
import ProductForm from './ProductForm'; 
import ProductDetail from './ProductDetail'; 
import NavBar from './NavBar';

export class ProductCatalog extends Component {

    constructor(){
        super();
        this.state = {
            products: [],
            selectedProductId: null,
        }
        this.selectProduct = this.selectProduct.bind(this); 
    }

    componentDidMount(){

        const fetchedProducts = [
            { id: 1, name: 'Product 1'},
            { id: 2, name: 'Product 2'},
            { id: 3, name: 'Product 3'}
        ]

        this.setState({ products: fetchedProducts })
    }

    selectProduct =  (id) => {
        console.log(id)
        this.setState({ selectedProductId: id })
        
    }
    
  
    componentWillUnmount(){
    
        console.log('ProductCatalog Component is being unmounted')
    }
    
    
  render() {
    
    const myProducts = this.state.products
    return (
        <div>
            <NavBar />
            <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
               {myProducts.map( product  => (
                <ListGroup.Item key={product.id} className="d-flex justify-content-around align-items-center" action onClick={() => this.selectProduct(product.id)}>
                    {product.name}
                    <Button className='ms-4 w-50' as={Link} to={`../edit-product/${product.id}`} variant='outline-success'>Edit</Button>
                </ListGroup.Item>
               ))}
            </ListGroup>
            { this.state.selectedProductId &&
                <Container fluid className='d-flex flex-column align-items-center'>
                    <h2>Selected Product: {this.state.selectedProductId}</h2> 
                    <ProductDetail productId={this.state.selectedProductId} />
                </Container>
            }
        </div>
    )
  }
}

export default ProductCatalog;