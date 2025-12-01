import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/EmiregiStyle/Emi.css"
import Header from "../Layout/Header";
const Emi = () => {
  const navigate = useNavigate();
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const [emiList, setEmiList] = useState([]);

  useEffect(() => {
    fetch("https://shop999backend.vercel.app/api/v1/emi/list/api42")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.allEmi) {
            setEmiList(data.allEmi);

          // SUM totalOutstandingAmount from all EMI entries
            const total = data.allEmi.reduce((sum, emi) => {
            const value = Number(emi.totalOutstandingAmount) || 0;
            return sum + value;
          }, 0);

          setTotalOutstanding(total);
        }
      })
      .catch((err) => console.error("Error fetching EMI data:", err));
  }, []);

  const handleCreateEmi = () => {
    setTimeout(() => {
      navigate("/emiregi");
    }, 1000);
  };

  const handleViewEmi = () => {
    navigate("/emidashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Header/>
      
      <h2 style={{color:"white"}}>EMI Dashboard</h2>
      <div style={{ marginTop:"30px"}}>
        <button
          onClick={handleCreateEmi}
          style={{
            padding: "10px 20px",
            marginRight: "20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ➕ Create EMI
        </button>

        <button
          onClick={handleViewEmi}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          👁️ View EMI
        </button>
      </div>
      {/* 👉 TOTAL OUTSTANDING AMOUNT */}
      <div>
        <h3 style={{color:"white"}}>Total Remaining Amount :-</h3>
        <h1 style={{ color: "red" }}>₹ {totalOutstanding.toLocaleString()}</h1>
      </div>
     {/* EMI CARDS LIST */}
      <div className="emi-card-grid">
        {emiList.map((emi) => (
          <div className="emi-card-home" key={emi._id}>
            <h3>{emi.FinanceCompany}</h3>
               <p><strong>Remaining Tenure:</strong> {emi.RemainloanTenureInMonths} months</p>
            <p><strong>Total Repaid:</strong> ₹{emi.totalLoanAmountRepaid}</p>
            <p><strong>Outstanding:</strong> ₹{emi.outstandingLoanAmount}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Emi;
