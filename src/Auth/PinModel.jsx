import React, { useEffect, useState } from 'react'
import "../Styles/AuthStyle/CreatePin.css"
import Header from '../Componants/Layout/Header'
import Footer from '../Componants/Layout/Footer'
const PinModel = () => {
    const [email, setEmail] = useState("")
    const [pin, setPin] = useState("")
    const [confirmPin, setConfirmPin] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail")
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            alert("No email found. Login again.");
            window.location.href = "/login";
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pin !== confirmPin) {
            alert("❌ PIN and Confirm PIN do not match!");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/create-new-pin/create/create-pin/api48",
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
                setTimeout(() => {
                    window.location.href = "/";
                }, 800)
            } else {
                alert(data.message || "❌ Error creating PIN!");
            }

        } catch (error) {
            console.log(error);
            alert("⚠️ Server error while creating PIN.");

        } finally {
            setLoading(false);

        }
    }
    return (
        <>
            <Header />
            <div className='pin-container'>
                <form className="pin-card" onSubmit={handleSubmit}>
                    <h2>Create Your Security PIN 🔐</h2>
                    <p>This PIN will protect your data.</p>

                    <label>Email</label>
                    <input
                        className="pin-input"
                        type="email"
                        value={email}
                        disabled
                    />

                    <label>Enter PIN</label>
                    <input
                        className="pin-input"
                        type='password'
                        value={pin}
                        maxLength="4"
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                    <label>Confirm PIN</label>
                    <input
                        className="pin-input"
                        type="password"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        required
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className="pin-btn"
                    >
                        {loading ? "Creating PIN..." : "Create PIN"}

                    </button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default PinModel
