import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../Styles/AuthStyle/Login.css"; // we'll create this file next

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUserId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("Login submitted successfully!");
    // Later: You can call your backend API here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p>Login to your account</p>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="emailOrUserId"
            placeholder="Email or User ID"
            value={formData.emailOrUserId}
            onChange={handleChange}
            required
          />
        </div>

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

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="signup-text">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
