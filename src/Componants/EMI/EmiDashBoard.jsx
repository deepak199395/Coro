import React, { useEffect, useState } from "react";
import "../../Styles/EmiregiStyle/EmiDashboard.css";
import { useNavigate } from "react-router-dom";

const EmiDashBoard = () => {
  const [emis, setEmi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

const navigate = useNavigate();

  useEffect(() => {
    fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/foremi-details/FOX-EMI/api42")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.allEmi) {
          setEmi(data.allEmi);
        } else {
          console.warn("Unexpected API format:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching EMI data:", error);
        setLoading(false);
      });
  }, []);

  // Filter EMIs by customer name or ID
  const filteredEmis = emis.filter((emi) =>
    emi.customerName.toLowerCase().includes(search.toLowerCase()) ||
    emi.customerId.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="loading">⏳ Loading EMI details...</div>;
  }

  return (
    <div className="emi-dashboard">
      <h2 className="dashboard-title">📊 EMI Dashboard</h2>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Customer Name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Show total count */}
      <p className="total-count">Total EMI Records: {filteredEmis.length}</p>

      {/* No data */}
      {filteredEmis.length === 0 ? (
        <p className="no-data">No matching EMI records found.</p>
      ) : (
        <div className="emi-grid">
          {filteredEmis.map((emi) => (
            <div className="emi-card" key={emi._id}
            onClick={()=>navigate("/emiscreen",{state:emi})}
            style={{ cursor: "pointer" }}>

              <h3>{emi.customerName}</h3>
              <p><strong>Loan ID:</strong> {emi.customerId}</p>
              <p><strong>Finance Company:</strong> {emi.FinanceCompany}</p>
              <p><strong>Loan Amount:</strong> ₹{emi.loanAmount}</p>
              <p><strong>Interest:</strong> {emi.rateOfInterestPerAnnum}</p>
              <p><strong>Type:</strong> {emi.interestRateType}</p>
              <p><strong>Tenure:</strong> {emi.loanTenureInMonths} months</p>
              <p><strong>Tenure:</strong> {emi.RemainloanTenureInMonths} months</p>
              <p><strong>Outstanding:</strong> ₹{emi.outstandingLoanAmount}</p>
              <p><strong>Status:</strong> <span className={`status ${emi.loanStatus.toLowerCase()}`}>{emi.loanStatus}</span></p>
              <p className="date">
                <strong>Start:</strong> {emi.loanCreationDate} <br />
                <strong>End:</strong> {emi.instalmentEndDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmiDashBoard;
