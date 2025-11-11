import React from "react";
import "./PickerStyles.css";

const CountryPicker = ({ label = "Select Country", value, onChange }) => {
  const countries = [
    "India 🇮🇳",
    "United States 🇺🇸",
    "United Kingdom 🇬🇧",
    "Canada 🇨🇦",
    "Australia 🇦🇺",
    "Germany 🇩🇪",
    "France 🇫🇷",
    "Japan 🇯🇵",
    "Singapore 🇸🇬",
    "United Arab Emirates 🇦🇪",
  ];

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <select
        className="normal-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select Country --</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryPicker;
