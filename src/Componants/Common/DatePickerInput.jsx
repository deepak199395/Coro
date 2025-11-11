import React from "react";
import "../../Styles/CommonStyle/DatepickerStyle.css"
const DatePickerInput = ({ label, value, onChange }) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="date-input"
      />
    </div>
  );
};

export default DatePickerInput;
