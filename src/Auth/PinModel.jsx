import React, { useEffect, useState } from "react";
import "../Styles/AuthStyle/CreatePin.css";
import Header from "../Componants/Layout/Header";
import Footer from "../Componants/Layout/Footer";
import { useSelector } from "react-redux";

const PinModel = () => {
  const { userEmail, isLogin } = useSelector((state) => state.auth);

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPin, setHasPin] = useState(false);

  // Load PIN status + Protect Route
  useEffect(() => {
    if (!isLogin) {
      alert("⚠ Please login first!");
      window.location.href = "/login";
      return;
    }

    if (!userEmail) {
      alert("⚠ No user email found. Please login again.");
      window.location.href = "/login";
      return;
    }

    // 🔍 Check if PIN exists (API 49)
    fetch(
      "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/get-pin/create/get-pin/api49"
    )
      .then((res) => res.json())
      .then((data) => {
        const pinRecord = data?.data?.find(
          (p) => p.regiEmailId === userEmail
        );

        setHasPin(Boolean(pinRecord));
      })
      .catch((err) => console.log("❌ Error fetching PIN:", err));
  }, [isLogin, userEmail]);

  console.log("🔍 Debug: Logged In User:", userEmail);
  console.log("🔍 Debug: Login Status:", isLogin);
  // 🔐 Create PIN (API 48)
  const handleCreatePin = async (e) => {
    e.preventDefault();

    if (pin !== confirmPin) {
      alert("❌ PIN and Confirm PIN do not match!");
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
            regiEmailId: userEmail,
            EnterPin: pin,
            confirmPin: confirmPin,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        alert("🔐 " + data.message);
        setTimeout(() => (window.location.href = "/home"), 800);
      } else {
        alert(data.message || "❌ Unable to create PIN!");
      }
    } catch (error) {
      alert("⚠ Server error while creating PIN.");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Verify PIN (API 50)
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
            regiEmailId: userEmail,
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
      alert("⚠ Server error while verifying PIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="pin-container">
        <form
          className="pin-card"
          onSubmit={hasPin ? handleVerifyPin : handleCreatePin}
        >
          <h2>{hasPin ? "Enter Your PIN 🔐" : "Create Your Security PIN 🔐"}</h2>

          <p className="pin-subtitle">
            {hasPin
              ? "Enter your PIN to continue"
              : "This PIN will secure your account"}
          </p>

          {/* Show Email from Redux */}
          <label>Email</label>
          <input type="email" value={userEmail} disabled className="pin-input" />

          {/* PIN Inputs */}
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
            {loading
              ? hasPin
                ? "Verifying..."
                : "Creating..."
              : hasPin
              ? "Verify PIN"
              : "Create PIN"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default PinModel;
