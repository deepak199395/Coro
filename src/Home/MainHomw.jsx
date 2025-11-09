import React from 'react';
import '../Styles/Home/Mainhome.css';  // make sure this path is correct
import { FaMoneyCheckAlt, FaWallet, FaChartLine, FaFileInvoice } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook

const MainHome = () => {
    const navigate = useNavigate();
    // Handle click navigation
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="main-container" onClick={() => handleNavigation('/emi')}>
      <div className="card" >
        <FaMoneyCheckAlt className='card-icon' />
        <h3>Loans & EMI</h3>
        <p>You can manage and track your EMI dues. You can also view details of pending and paid EMIs.</p>
      </div>

      <div className="card">
        <FaWallet className="card-icon" />
        <h3>Daily Expenses</h3>
        <p>Track your daily spending and analyze where your money goes.</p>
      </div>

      <div className="card">
        <FaChartLine className="card-icon" />
        <h3>SIP & Investments</h3>
        <p>Monitor your SIPs, mutual funds, and investment growth over time.</p>
      </div>

      <div className="card">
        <FaFileInvoice className="card-icon" />
        <h3>Documents & Bills</h3>
        <p>Upload and manage your financial documents and monthly bills securely.</p>
      </div>
    </div>
  );
};

export default MainHome;
