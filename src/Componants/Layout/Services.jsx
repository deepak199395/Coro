import React from "react";
import "../../Styles/Layout/Services.css";
import { FaRobot, FaMoneyCheckAlt, FaWallet, FaChartLine, FaShieldAlt } from "react-icons/fa";
import Header from "./Header";

const Services = () => {
  return (
    <>
    <Header/>
    <div className="services-container">
      <div className="services-content">

        <h1>Our Services 💼</h1>
        <p className="subtitle">
          Explore everything Coro EMI Assistant offers to make your financial journey smooth.
        </p>

        <div className="services-grid">

          <div className="service-card">
            <FaRobot className="service-icon" />
            <h3>AI EMI Chatbot</h3>
            <p>Register EMIs, update loan details, and get help instantly using our smart chatbot.</p>
          </div>

          <div className="service-card">
            <FaMoneyCheckAlt className="service-icon" />
            <h3>Loan & EMI Management</h3>
            <p>Track EMIs, view repayment schedules, and manage loan status easily.</p>
          </div>

          <div className="service-card">
            <FaWallet className="service-icon" />
            <h3>Daily Expenses Tracker</h3>
            <p>Monitor your spending and get insights to manage your daily expenses.</p>
          </div>

          <div className="service-card">
            <FaChartLine className="service-icon" />
            <h3>SIP & Investments</h3>
            <p>Keep a close watch on SIPs, mutual funds, and other investments.</p>
          </div>

          <div className="service-card">
            <FaShieldAlt className="service-icon" />
            <h3>Secure Document Vault</h3>
            <p>Store and manage your bills, receipts, and financial documents safely.</p>
          </div>

        </div>

        <footer className="services-footer">
          © {new Date().getFullYear()} Coro EMI Assistant | Made with ❤️ for smarter finances
        </footer>

      </div>
    </div>
    </>
    
  );
};

export default Services;
