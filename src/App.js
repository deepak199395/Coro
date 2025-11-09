import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import Header from './Componants/Layout/Header';
import Footer from './Componants/Layout/Footer';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Emiregii from './Componants/EMI/Emiregii';
import EmiDashBoard from './Componants/EMI/EmiDashBoard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/header' element={<Header />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/emiregi' element={<Emiregii/>}/>
          <Route path='/emidashboard' element={<EmiDashBoard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
