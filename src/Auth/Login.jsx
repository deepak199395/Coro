import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../Styles/AuthStyle/Login.css";
import { useDispatch } from "react-redux";
import { login } from "../ReducToolkit/Slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
   // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/foxuserLogin/foxuser-corologin/api40",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status === true) {
        alert("✅ " + (data.massage || "Login Successful!"));

        // ⭐ Save email in Redux Toolkit
        dispatch(login(formData.email));

        // Reset form
        setFormData({ email: "", password: "" });

        // Redirect to PIN screen
        setTimeout(() => {
          window.location.href = "/create-pin";
        }, 800);
      } else {
        alert(data.massage || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p>Login to your account</p>

        {/* Email Field */}
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
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

        {/* Submit Button */}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="signup-text">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
