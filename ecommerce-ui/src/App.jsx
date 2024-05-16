import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// internal imports
import './App.css'; //keep as CSS stylesheet so global CSS styling
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import Home from './components/Home';
import NotFound from './components/NotFound';
import OrderList from './components/OrderList';
import UpdateProductForm from './components/UpdateProductForm';
import UpdateCustomerForm from './components/UpdateCustomerForm';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetails';
import OrderList from './components/OrderList';

import OrderForm from './components/OrderForm';
import OrderDetails from './components/OrderDetails';
import CustomerDetail from './components/CustomerDetail';

import ConfirmationModal from './components/ConfirmationModal';


function App(){
  return (
    <div className="app-container">
      <Routes>
        {}
        <Route path='/' element={<Home />} />
        <Route path='/customers' element={<CustomerList /> } /> 
        <Route path='/add-customer' element={<CustomerForm />} />
        <Route path='/edit-customer/:id' element={<CustomerForm />} />
        {}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}


export default App


