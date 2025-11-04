import React from 'react';
import '.././Styles/Home/Mainhome.css';  // make sure this path matches your folder

const MainHome = () => {
  return (
    <div className='main-container'>
      <div className='card'>
        <h3>Loans & EMI</h3>
      </div>
      <div className='card'>
        <h3>Daily Expenses</h3>
      </div>
      <div className='card'>
        <h3>SIP & Investments</h3>
      </div>
      <div className='card'>
        <h3>Documents & Bills</h3>
      </div>
    </div>
  );
};

export default MainHome;
