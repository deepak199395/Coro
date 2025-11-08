import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaCity, FaLock, FaMapPin } from "react-icons/fa";
import "../Styles/AuthStyle/Register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Send POST request to backend API
      const res = await axios.post(
        "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/vi/coroCreateUser/create-coro/api39",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success || res.data.status === true) {
        alert("✅ press ok for summit the Imformations");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          pincode: "",
          password: "",
          role: "user",
        });
       setTimeout(()=>{
        navigate('/login')
       })
      } else {
        alert(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Registration failed! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>🖤 Create Account</h2>
        <p className="form-subtitle">Fill in your details to register</p>

        {/* Full Name */}
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            
          />
        </div>

        {/* Email */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            
          />
        </div>

        {/* Phone */}
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            
          />
        </div>

        {/* City */}
        <div className="input-group">
          <FaCity className="input-icon" />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            
          />
        </div>

        {/* Pincode */}
        <div className="input-group">
          <FaMapPin className="input-icon" />
          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            
          />
        </div>

        {/* Submit */}
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login Link */}
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
