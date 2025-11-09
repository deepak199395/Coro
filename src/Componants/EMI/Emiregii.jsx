import React, { useState } from "react";
import {
  FaUser,
  FaRupeeSign,
  FaPercentage,
  FaBalanceScale,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaListOl,
  FaClipboardCheck,
} from "react-icons/fa";
import "../../Styles/EmiregiStyle/EmiStyle.css";

const Emiregii = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    loanAmount: "",
    rateOfInterestPerAnnum: "",
    interestRateType: "",
    loanTenureInMonths: "",
    totalLoanAmountRepaid: "",
    instalmentAmount: "",
    loanCreationDate: "",
    firstInstalmentDate: "",
    instalmentEndDate: "",
    totalOutstandingAmount: "",
    outstandingLoanAmount: "",
    futurePrincipalComponent: "",
    futureInterestComponent: "",
    futureInstalmentNumber: "",
    loanStatus: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/emi/createEmi/api41", // example endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status === true) {
        alert("✅ EMI created successfully!");
        setFormData({
          customerId: "",
          customerName: "",
          loanAmount: "",
          rateOfInterestPerAnnum: "",
          interestRateType: "",
          loanTenureInMonths: "",
          totalLoanAmountRepaid: "",
          instalmentAmount: "",
          loanCreationDate: "",
          firstInstalmentDate: "",
          instalmentEndDate: "",
          totalOutstandingAmount: "",
          outstandingLoanAmount: "",
          futurePrincipalComponent: "",
          futureInterestComponent: "",
          futureInstalmentNumber: "",
          loanStatus: "",
        });
      } else {
        alert(data.message || "❌ Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emi-page-container">
      <form className="emi-form-container" onSubmit={handleSubmit}>
        <h2>📄 EMI Registration Form</h2>
        <p>Fill in all loan details below</p>

        {/* Customer ID */}
        <div className="input-group">
          <FaListOl className="input-icon" />
          <input
            type="text"
            name="customerId"
            placeholder="Customer ID"
            value={formData.customerId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Customer Name */}
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Loan Amount */}
        <div className="input-group">
          <FaRupeeSign className="input-icon" />
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Interest Rate */}
        <div className="input-group">
          <FaPercentage className="input-icon" />
          <input
            type="text"
            name="rateOfInterestPerAnnum"
            placeholder="Rate of Interest (e.g. 33%)"
            value={formData.rateOfInterestPerAnnum}
            onChange={handleChange}
            required
          />
        </div>

        {/* Interest Rate Type */}
        <div className="input-group">
          <FaBalanceScale className="input-icon" />
          <input
            type="text"
            name="interestRateType"
            placeholder="Interest Rate Type (Fixed / Floating)"
            value={formData.interestRateType}
            onChange={handleChange}
            required
          />
        </div>

        {/* Loan Tenure */}
        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="number"
            name="loanTenureInMonths"
            placeholder="Loan Tenure (Months)"
            value={formData.loanTenureInMonths}
            onChange={handleChange}
            required
          />
        </div>

        {/* Total Loan Amount Repaid */}
        <div className="input-group">
          <FaMoneyCheckAlt className="input-icon" />
          <input
            type="number"
            name="totalLoanAmountRepaid"
            placeholder="Total Loan Amount Repaid"
            value={formData.totalLoanAmountRepaid}
            onChange={handleChange}
            required
          />
        </div>

        {/* Instalment Amount */}
        <div className="input-group">
          <FaMoneyCheckAlt className="input-icon" />
          <input
            type="number"
            name="instalmentAmount"
            placeholder="Instalment Amount"
            value={formData.instalmentAmount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Loan Dates */}
        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="text"
            name="loanCreationDate"
            placeholder="Loan Creation Date (e.g. 09-Apr-2023)"
            value={formData.loanCreationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="text"
            name="firstInstalmentDate"
            placeholder="First Instalment Date (e.g. 02-May-2023)"
            value={formData.firstInstalmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="text"
            name="instalmentEndDate"
            placeholder="Instalment End Date (e.g. 02-Apr-2026)"
            value={formData.instalmentEndDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Outstanding Amounts */}
        <div className="input-group">
          <FaRupeeSign className="input-icon" />
          <input
            type="number"
            name="totalOutstandingAmount"
            placeholder="Total Outstanding Amount"
            value={formData.totalOutstandingAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaRupeeSign className="input-icon" />
          <input
            type="number"
            name="outstandingLoanAmount"
            placeholder="Outstanding Loan Amount"
            value={formData.outstandingLoanAmount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Future Components */}
        <div className="input-group">
          <FaRupeeSign className="input-icon" />
          <input
            type="number"
            name="futurePrincipalComponent"
            placeholder="Future Principal Component"
            value={formData.futurePrincipalComponent}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaRupeeSign className="input-icon" />
          <input
            type="number"
            name="futureInterestComponent"
            placeholder="Future Interest Component"
            value={formData.futureInterestComponent}
            onChange={handleChange}
            required
          />
        </div>

        {/* Instalment Number */}
        <div className="input-group">
          <FaListOl className="input-icon" />
          <input
            type="number"
            name="futureInstalmentNumber"
            placeholder="Future Instalment Number"
            value={formData.futureInstalmentNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Loan Status */}
        <div className="input-group">
          <FaClipboardCheck className="input-icon" />
          <input
            type="text"
            name="loanStatus"
            placeholder="Loan Status (Active / Closed)"
            value={formData.loanStatus}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="emi-submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit EMI Details"}
        </button>
      </form>
    </div>
  );
};

export default Emiregii;
