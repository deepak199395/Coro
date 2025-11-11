import React from "react";
import "../../Styles/CommonStyle/TextPicker.css";

const NormalTextInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "Type here...",
  options = [], // 🔽 if options are provided → show dropdown
  disabled = false,
}) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}

      {/* 🔽 If options exist → show select dropdown */}
      {options.length > 0 ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="normal-select"
        >
          <option value="">-- Select --</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="normal-input"
        />
      )}
    </div>
  );
};

export default NormalTextInput;
