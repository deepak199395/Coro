import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import Header from './Componants/Layout/Header';
import Footer from './Componants/Layout/Footer';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Emiregii from './Componants/EMI/Emiregii';
import EmiDashBoard from './Componants/EMI/EmiDashBoard';
import Emi from './Componants/EMI/Emi';
import DatePickerInput from './Componants/Common/DatePickerInput';
import NormalTextInput from './Componants/Common/NormalTextInput';
import EmiScreen from './Componants/EMI/EmiScreen';
import SIPInvestments from './Home/SIPInvestments';
import DocumentsBills from './Home/DocumentsBills';
import DailyExpenses from './Home/DailyExpenses';

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
          <Route path='/emi' element={<Emi/>}/>
          <Route path='/datepicker' element={<DatePickerInput/>}/>
          <Route path='/textInputpicker' element={<NormalTextInput/>}/>
          <Route path='/emiscreen' element={<EmiScreen/>}/>
          <Route path="/SIPInvestments" element={<SIPInvestments/>}/>
          <Route path='/DocumentsBills' element={<DocumentsBills/>}/>
          <Route path='/dailyExpenses' element={<DailyExpenses/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
