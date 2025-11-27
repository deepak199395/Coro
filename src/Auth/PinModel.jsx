import React, { useEffect, useState } from 'react'
import "../Styles/AuthStyle/CreatePin.css"
import Header from '../Componants/Layout/Header'
import Footer from '../Componants/Layout/Footer'

const PinModel = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPin, setHasPin] = useState(false); // 🔥 NEW — does this email already have PIN?

  // Load email and check if PIN exists
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");

    if (!storedEmail) {
      alert("No email found. Please login again.");
      window.location.href = "/login";
      return;
    }

    setEmail(storedEmail);
    
    // 🔍 Check if PIN exists using API49
    fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/get-pin/create/get-pin/api49")
      .then(res => res.json())
      .then(data => {
        const pinRecord = data?.data?.find(p => p.regiEmailId === storedEmail);
        setHasPin(Boolean(pinRecord)); // true if user already created a PIN earlier
      })
      .catch(err => console.log("❌ Error fetching PIN:", err));

  }, []);

  // 🔐 Create NEW PIN (api48)
  const handleCreatePin = async (e) => {
    e.preventDefault();

    if (pin !== confirmPin) {
      alert("❌ PIN & Confirm PIN do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/create-new-pin/create/create-pin/api48",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            regiEmailId: email,
            EnterPin: pin,
            confirmPin: confirmPin,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        alert("🔐 " + data.message);
        setTimeout(() => (window.location.href = "/"), 800);
      } else {
        alert(data.message || "❌ Unable to create PIN!");
      }
    } catch (error) {
      console.log(error);
      alert("⚠ Server error while creating PIN.");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Verify Existing PIN (api50)
  const handleVerifyPin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/verify-exixtingPin/verify/exixtingPin/api50",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            regiEmailId: email,
            EnterPin: pin,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        alert("✔ PIN Verified Successfully!");
        setTimeout(() => (window.location.href = "/home"), 800);
      } else {
        alert(data.message || "❌ Incorrect PIN!");
      }
    } catch (error) {
      console.log(error);
      alert("⚠ Server error while verifying PIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="pin-container">
        <form className="pin-card" onSubmit={hasPin ? handleVerifyPin : handleCreatePin}>
          
          <h2>{hasPin ? "Enter Your PIN 🔐" : "Create Your Security PIN 🔐"}</h2>

          <p className="pin-subtitle">
            {hasPin ? "Enter your PIN to continue" : "This PIN will protect your data"}
          </p>

          {/* Email (Auto-filled) */}
          <label>Email</label>
          <input type="email" value={email} disabled className="pin-input" />

          {/* If PIN already exists → Only show Enter PIN */}
          {hasPin ? (
            <>
              <label>Enter PIN</label>
              <input
                className="pin-input"
                type="password"
                maxLength="4"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <label>Enter PIN</label>
              <input
                className="pin-input"
                type="password"
                maxLength="4"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />

              <label>Confirm PIN</label>
              <input
                className="pin-input"
                type="password"
                maxLength="4"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="pin-btn" disabled={loading}>
            {loading ? (hasPin ? "Verifying..." : "Creating...") : (hasPin ? "Verify PIN" : "Create PIN")}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default PinModel;
