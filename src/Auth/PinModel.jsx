import React, { useEffect, useState } from "react";
import "../Styles/AuthStyle/CreatePin.css";
import Header from "../Componants/Layout/Header";
import Footer from "../Componants/Layout/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../Api/EndPoint";

const PinModel = () => {
  const navigate = useNavigate();
  const { userEmail, isLogin } = useSelector((state) => state.auth);

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPin, setHasPin] = useState(false);

  // Load PIN status + Protect Route
  useEffect(() => {
    if (!isLogin || !userEmail) {
      toast.error("Please login first!", { autoClose: 1500 });
      navigate("/login");
      return;
    }

    fetch(
      API.PIN_LIST
    )
      .then((res) => res.json())
      .then((data) => {
        const pinRecord = data?.data?.find(
          (p) => p.regiEmailId === userEmail
        );
        setHasPin(Boolean(pinRecord));
      })
      .catch(() => {
        toast.error("Failed to check PIN status", { autoClose: 1500 });
      });
  }, [isLogin, userEmail, navigate]);

  // CREATE PIN
  const handleCreatePin = async (e) => {
    e.preventDefault();

    if (pin !== confirmPin) {
      toast.error("PIN and Confirm PIN do not match!", { autoClose: 1500 });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
          API.PIN_CREATE,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            regiEmailId: userEmail,
            EnterPin: pin,
            confirmPin,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        toast.success(data.message, { autoClose: 1200 });
        setTimeout(() => navigate("/home"), 1200);
      } else {
        toast.error(data.message || "Unable to create PIN", {
          autoClose: 1500,
        });
      }
    } catch {
      toast.error("Server error. Try again later.", { autoClose: 1500 });
    } finally {
      setLoading(false);
    }
  };

  // VERIFY PIN
  const handleVerifyPin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        API.PIN_VERIFY,
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
        toast.success("PIN Verified Successfully!", { autoClose: 1200 });
        setTimeout(() => navigate("/home"), 1200);
      } else {
        toast.error(data.message || "Incorrect PIN", { autoClose: 1500 });
      }
    } catch {
      toast.error("Server error while verifying PIN.", {
        autoClose: 1500,
      });
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

          <label>Email</label>
          <input type="email" value={userEmail} disabled className="pin-input" />

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
