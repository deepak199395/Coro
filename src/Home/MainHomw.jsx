import React, { useState, useEffect } from 'react';
import '../Styles/Home/Mainhome.css';
import { FaMoneyCheckAlt, FaWallet, FaChartLine, FaFileInvoice } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Carosel from "../Componants/Common/Carosel.jsx";

const MainHome = () => {
  const navigate = useNavigate();
  const [showCoachmark, setShowCoachmark] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCoachmark(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Coachmark Modal */}
      {showCoachmark && (
        <div className="coachmark-overlay">
          <div className="coachmark-box">
            <h3>Note 📌</h3>
            <p>
              The EMI details shown inside this application are <b>dummy data</b>
              used only for <b>testing purposes</b>.
            </p>

            <button className="coachmark-btn" onClick={() => setShowCoachmark(false)}>
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Carousel Section */}
      <Carosel />

      {/* Main Cards Section */}
      <div className="home-container">

        <div className="home-card" onClick={() => handleNavigation('/emi')}>
          <FaMoneyCheckAlt className="home-card-icon" />
          <h3>Loans & EMI</h3>
          <p>Manage, track, and review all your loan EMIs in one place.</p>
        </div>

        <div className="home-card" onClick={() => handleNavigation('/dailyExpenses')}>
          <FaWallet className="home-card-icon" />
          <h3>Daily Expenses</h3>
          <p>Keep track of your daily spending habits and expenses.</p>
        </div>

        <div className="home-card" onClick={() => handleNavigation('/SIPInvestments')}>
          <FaChartLine className="home-card-icon" />
          <h3>SIP & Investments</h3>
          <p>Monitor your SIPs, mutual funds, and overall investment growth.</p>
        </div>

        <div className="home-card" onClick={() => handleNavigation('/DocumentsBills')}>
          <FaFileInvoice className="home-card-icon" />
          <h3>Documents & Bills</h3>
          <p>Store and organize your bills and important financial documents.</p>
        </div>

      </div>
    </>
  );
};

export default MainHome;
