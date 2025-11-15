import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/EmiregiStyle/EmiScreenstyle.css";

const EmiScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No EMI Data Found</h2>;

  return (
    <div className="emi-screen-container">

      <h2 className="emi-screen-title">📄 EMI Details</h2>

      {/* Customer Section */}
      <h3 className="section-title">Customer Information</h3>
      <div className="detail-row"><strong>Name:</strong> <span>{state.customerName}</span></div>
      <div className="detail-row"><strong>Customer ID:</strong> <span>{state.customerId}</span></div>
      <div className="detail-row"><strong>Finance Company:</strong> <span>{state.FinanceCompany}</span></div>

      {/* Loan Section */}
      <h3 className="section-title">Loan Information</h3>
      <div className="detail-row"><strong>Loan Amount:</strong> <span>₹{state.loanAmount}</span></div>
      <div className="detail-row"><strong>Interest Rate:</strong> <span>{state.rateOfInterestPerAnnum}</span></div>
      <div className="detail-row"><strong>Interest Type:</strong> <span>{state.interestRateType}</span></div>
      <div className="detail-row"><strong>Tenure:</strong> <span>{state.loanTenureInMonths} months</span></div>
      <div className="detail-row"><strong>Outstanding Amount:</strong> <span>₹{state.outstandingLoanAmount}</span></div>

      {/* Status */}
      <div className="detail-row">
        <strong>Status:</strong>
        <span className={`status-badge ${state.loanStatus.toLowerCase()}`}>
          {state.loanStatus}
        </span>
      </div>

      {/* Dates */}
      <h3 className="section-title">Important Dates</h3>
      <div className="date-grid">
        <div className="date-card">
          <strong>Loan Start</strong>
          {state.loanCreationDate}
        </div>

        <div className="date-card">
          <strong>First Instalment</strong>
          {state.firstInstalmentDate}
        </div>

        <div className="date-card">
          <strong>End Date</strong>
          {state.instalmentEndDate}
        </div>
      </div>

      {/* Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
};

export default EmiScreen;
