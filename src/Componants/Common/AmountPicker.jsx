import React, { useState } from "react";
import "./PickerStyles.css";

const AmountPicker = ({
  label = "Enter Amount",
  value,
  onChange,
  min = 1000,
  max = 10000000,
}) => {
  const [error, setError] = useState("");

  const handleChange = (val) => {
    if (!val.trim()) {
      setError("");
      onChange(val);
      return;
    }

    if (isNaN(val)) {
      setError("⚠️ Please enter numbers only");
      return;
    }

    const num = Number(val);
    if (num < min) {
      setError(`⚠️ Minimum amount is ₹${min.toLocaleString()}`);
    } else if (num > max) {
      setError(`⚠️ Maximum amount is ₹${max.toLocaleString()}`);
    } else {
      setError("");
    }

    onChange(val);
  };

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`normal-input ${error ? "input-error" : ""}`}
        placeholder="Enter loan amount..."
      />
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
};

export default AmountPicker;
