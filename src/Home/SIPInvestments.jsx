import React from "react";
import "../Styles/SIP/SIPInvestmentsStyle.css";
import Header from "../Componants/Layout/Header";
import Footer from "../Componants/Layout/Footer";

const SIPInvestments = () => {
  return (
    <>
    <Header/>
    <div className="sip-container">
      <header className="sip-header">
        <h1>📈 SIP & Investment Tracker</h1>
        <p>Grow your wealth with smart, systematic investment planning.</p>
      </header>

      <div className="sip-cards">
        <div className="sip-card">
          <h3>Start a New SIP</h3>
          <p>Plan your monthly investment and expected returns.</p>
          <button>Start Now</button>
        </div>

        <div className="sip-card">
          <h3>Track Existing SIPs</h3>
          <p>View growth, returns, and maturity predictions.</p>
          <button>Track SIP</button>
        </div>

        <div className="sip-card">
          <h3>Compare Mutual Funds</h3>
          <p>Analyze top-performing funds in real time.</p>
          <button>Compare</button>
        </div>
      </div>

      <section className="sip-stats">
        <h2>Your Investment Summary</h2>
        <div className="stats-grid">
          <div className="stats-box">
            <h4>Total SIPs</h4>
            <p>0</p>
          </div>
          <div className="stats-box">
            <h4>Total Monthly Investment</h4>
            <p>₹0</p>
          </div>
          <div className="stats-box">
            <h4>Expected Returns</h4>
            <p>₹0</p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default SIPInvestments;