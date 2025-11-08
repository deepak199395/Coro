import React, { useState } from "react";
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

  // Handle form submission using Fetch
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/vi/coroCreateUser/create-coro/api39",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success || data.status === true) {
        alert("✅ Press OK to submit your information!");

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          pincode: "",
          password: "",
          role: "user",
        });

        // Redirect after short delay
        setTimeout(() => {
          navigate("/login");
        }, 800);
      } else {
        alert(data.message || "❌ Something went wrong!");
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
