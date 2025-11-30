import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import botAvatar from "../../Assets/botAvatar.png";
import { useNavigate } from "react-router-dom";
import "../../Styles/EmiregiStyle/EmiStyle.css";
import DatePickerInput from "../Common/DatePickerInput";
import NormalTextInput from "../Common/NormalTextInput";
import { useSelector } from "react-redux";

// Chat fields AFTER email confirmation
const fields = [
    { key: "expenses", question: "How much did you spend today?" },
    { key: "reasonOfExpenses", question: "What did you spend it on?" },
    { key: "dateOfExpenses", question: "Select the date of expense." },
];

const reasonOptions = [
    "Grocery 🛒",
    "Tea / BreakFast☕",
    "Lunch / Dinner🍽",
    "Rent🏠",
    "Drink",
    "EMIs",
    "Petrol🏠",
    "Others"
];

const yesNoOptions = ["Yes", "No"];

const ChatbotDailyExpess = () => {
    const navigate = useNavigate();
    const chatEndRef = useRef(null);
    const { userEmail } = useSelector((state) => state.auth);
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [formData, setFormData] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const [emailStep, setEmailStep] = useState(true);
    const [waitingForEmail, setWaitingForEmail] = useState(false);

    // Auto-scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Start chat
    useEffect(() => {
        const intro = "Hello! Let's record your daily expense.";
        const askEmail = `Is this your registered email ID: ${userEmail}? (Yes / No)`;

        setMessages([
            { sender: "bot", text: intro },
            { sender: "bot", text: askEmail },
        ]);

        speak(intro, "female");
        setTimeout(() => speak(askEmail, "female"), 1000);
    }, [userEmail]);

    // 🗣️ Voice
    const speak = (text, gender = "female") => {
        if (!window.speechSynthesis) return;
        const msg = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find((v) =>
            gender === "female"
                ? v.name.toLowerCase().includes("female")
                : v.name.toLowerCase().includes("male")
        );
        if (selectedVoice) msg.voice = selectedVoice;
        msg.pitch = 1;
        msg.rate = 1;
        window.speechSynthesis.speak(msg);
    };

    // MAIN SENDING LOGIC
    const handleSend = async (e) => {
        e.preventDefault();

        // No empty answer allowed
        if (!userInput.trim() && step !== 2) return;

        // ⭐ STEP 1 — EMAIL CONFIRMATION YES/NO
        if (emailStep) {
            const answer = userInput.trim().toLowerCase();

            setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
            setUserInput("");

            if (answer === "yes") {
                setFormData((prev) => ({ ...prev, regiEmailId: userEmail }));
                setEmailStep(false);

                const firstQ = fields[0].question;
                setMessages((prev) => [...prev, { sender: "bot", text: firstQ }]);
                speak(firstQ, "female");
                return;
            }

            if (answer === "no") {
                const askCorrectEmail = "Please enter your registered email ID.";
                setMessages((prev) => [...prev, { sender: "bot", text: askCorrectEmail }]);
                speak(askCorrectEmail, "female");

                setWaitingForEmail(true);
                return;
            }

            const again = "Please select Yes or No from the dropdown.";
            setMessages((prev) => [...prev, { sender: "bot", text: again }]);
            speak(again, "female");
            return;
        }

        // ⭐ STEP 2 — User enters email manually
        if (waitingForEmail) {
            setMessages((prev) => [...prev, { sender: "user", text: userInput }]);

            setFormData((prev) => ({
                ...prev,
                regiEmailId: userInput,
            }));

            setWaitingForEmail(false);
            setEmailStep(false);
            setUserInput("");

            const firstQ = fields[0].question;
            setMessages((prev) => [...prev, { sender: "bot", text: firstQ }]);
            speak(firstQ, "female");

            return;
        }

        // ⭐ STEP 3 — NORMAL BOT QUESTIONS
        const currentField = fields[step];

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: userInput || formData.dateOfExpenses },
        ]);

        const valueToSave = step === 2 ? formData.dateOfExpenses : userInput;

        setFormData((prev) => ({ ...prev, [currentField.key]: valueToSave }));

        const newStep = step + 1;
        setUserInput("");

        if (newStep < fields.length) {
            setStep(newStep);
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);
                const botText = fields[newStep].question;

                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: botText },
                ]);
                speak(botText, "female");
            }, 1000);

            return;
        }

        // ⭐ STEP 4 — SUBMIT TO BACKEND
        setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "⏳ Saving your expense..." },
        ]);

        try {
            const res = await fetch(
                "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/expensse-deails/fox-expenses/api43",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData }),
                }
            );

            const data = await res.json();

            if (data.success === true) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "✅ Expense saved successfully! 🎉" },
                ]);

                setTimeout(() => navigate("/dailyExpensesDashboard"), 1500);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "❌ Something went wrong!" },
                ]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Server error. Try again." },
            ]);
        }
    };

    return (
        <div className="chat-container">

            <div className="chat-header">
                <img src={botAvatar} alt="Bot" className="bot-avatar" />
                <div>
                    <h3>Daily Expense Assistant 🤖</h3>
                    <p>Online now</p>
                </div>
            </div>

            <div className="chat-box">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.sender}`}>
                        {msg.sender === "bot" && (
                            <img src={botAvatar} alt="bot" className="bot-icon" />
                        )}
                        <p>{msg.text}</p>
                    </div>
                ))}

                {isTyping && (
                    <div className="message bot typing">
                        <img src={botAvatar} alt="bot" className="bot-icon" />
                        <div className="typing-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* ⭐ INPUT AREA */}
            <form className="input-area" onSubmit={handleSend}>

                {/* 1️⃣ YES / NO DROPDOWN */}
                {emailStep && !waitingForEmail && (
                    <select
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="dropdown-input"
                        required
                    >
                        <option value="">Select Yes or No</option>
                        {yesNoOptions.map((opt, i) => (
                            <option key={i} value={opt.toLowerCase()}>
                                {opt}
                            </option>
                        ))}
                    </select>
                )}

                {/* 2️⃣ USER ENTER EMAIL */}
                {waitingForEmail && (
                    <input
                        type="email"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your registered email..."
                        required
                    />
                )}

                {/* 3️⃣ AMOUNT */}
                {!emailStep && !waitingForEmail && step === 0 && (
                    <NormalTextInput
                        label=""
                        value={userInput}
                        placeholder="Enter amount..."
                        onChange={(val) => setUserInput(val)}
                    />
                )}

                {/* 4️⃣ REASON */}
                {!emailStep && !waitingForEmail && step === 1 && (
                    <NormalTextInput
                        label=""
                        value={userInput}
                        onChange={(val) => setUserInput(val)}
                        options={reasonOptions}
                    />
                )}

                {/* 5️⃣ DATE PICKER */}
                {!emailStep && !waitingForEmail && step === 2 && (
                    <DatePickerInput
                        label=""
                        value={formData.dateOfExpenses || ""}
                        onChange={(val) =>
                            setFormData({ ...formData, dateOfExpenses: val })
                        }
                    />
                )}

                <button type="submit">
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
};

export default ChatbotDailyExpess;
