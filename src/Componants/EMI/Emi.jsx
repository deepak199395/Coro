import React from "react";
import { useNavigate } from "react-router-dom";

const Emi = () => {
  const navigate = useNavigate();

  const handleCreateEmi = () => {
    // Navigate instantly (or after 1 sec)
    setTimeout(() => {
      navigate("/emiregi");
    }, 1000);
  };

  const handleViewEmi = () => {
    // Navigate to EMI view page (you can change this path)
    navigate("/emidashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>EMI Dashboard</h2>

      <div style={{ marginTop: "30px" }}>
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
    </div>
  );
};

export default Emi;
