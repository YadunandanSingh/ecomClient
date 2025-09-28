import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './index.css'
// import Pages from './Pages/Pages'
import Header from './componets/Header'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/register';
import UserAccount from './Pages/UserAccount';
import ProtectiveRoute from './componets/Routing/ProtectiveRoute';
import Dashbord from './Pages/Admin/Dashbord';
import AdminProjectRoute from './componets/Routing/AdminProjectRoute';
import AdminLayout from './componets/Admin/AdminLayout';
import ProductDetail from './Pages/ProductDetail';
import ProductList from './Pages/ProductList';
import { Footer } from './componets/Footer';
import NotFound from './Pages/NotFound';
import ChekOut from './Pages/ChekOut';
import UserAccountLayout from './componets/UserAccountLayout';

function App() {
  document.title ='Ecommerse'

  return (

    <>
    <Header/> 
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Detail' element={<ProductDetail/>}/>
        <Route path='/products' element={<ProductList/>}/>

        <Route path='/products/:id' element={<ProductList/>}/>
        <Route path='*' element={<NotFound/>}/>


        <Route path='/admin' element={<AdminProjectRoute> <AdminLayout/> </AdminProjectRoute>}/>
        <Route path='/account' element={<ProtectiveRoute> <UserAccountLayout/> </ProtectiveRoute> }/>
        <Route path='/checkout' element={<ProtectiveRoute> <ChekOut/> </ProtectiveRoute> }/>

      </Routes>
    <Footer/>
    </>
  )
}

export default App
