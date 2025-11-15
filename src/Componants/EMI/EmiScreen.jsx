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
            <div className="detail-row"><strong>Customer ID:</strong> <span>{state.customerId}</span></div>
            <div className="detail-row"><strong>Finance Company:</strong> <span>{state.FinanceCompany}</span></div>
            <div className="detail-row"><strong>Tenure:</strong> <span>{state.loanTenureInMonths} months</span></div>
            <div className="detail-row"><strong>Remaining Tenure:</strong> <span>{state.RemainloanTenureInMonths}</span></div>
            {/* Loan Section */}
            <h3 className="section-title">Loan Information</h3>
            <div className="detail-row"><strong>Loan Amount:</strong> <span>₹{state.loanAmount}</span></div>
            <div className="detail-row"><strong>Outstanding Amount:</strong> <span>₹{state.outstandingLoanAmount}</span></div>
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
            <h3 className="section-title">Tenure Progress</h3>
            <div className="tenure-box-container">
             {
                Array.from({length:state.loanTenureInMonths}).map((_,index)=>{
                    const isCompleted = index < state.RemainloanTenureInMonths;
                    return(
                        <div
                        key={index}
                        className={`tenure-box ${isCompleted ? "completed" : "remaining"}`}>
                        {index + 1}
                        </div>
                    );
                })}
            </div>
            {/* Button */}
            <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
    );
};

export default EmiScreen;
