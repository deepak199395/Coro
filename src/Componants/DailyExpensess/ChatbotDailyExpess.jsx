import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import botAvatar from "../../Assets/botAvatar.png";
import { useNavigate } from "react-router-dom";
import "../../Styles/EmiregiStyle/EmiStyle.css";
import DatePickerInput from "../Common/DatePickerInput";

const ChatbotDailyExpess = () => {
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [formData, setFormData] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    const fields = [
        { key: "expenses", question: "How much did you spend today?" },
        { key: "reasonOfExpenses", question: "What did you spend it on?" },
        { key: "dateOfExpenses", question: "Select the date of expense." },
    ];

    // Auto-scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Start Chat
    useEffect(() => {
        setMessages([
            { sender: "bot", text: "👋 Hello! Let's record your daily expense." },
            { sender: "bot", text: fields[0].question },
        ]);
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!userInput.trim() && step !== 2) return; // allow empty check only for text fields

        const currentField = fields[step];

        // Add user message
        setMessages((prev) => [...prev, { sender: "user", text: userInput || formData.dateOfExpenses }]);

        // Save input
        let valueToSave = step === 2 ? formData.dateOfExpenses : userInput;
        setFormData((prev) => ({ ...prev, [currentField.key]: valueToSave }));

        const newStep = step + 1;
        setUserInput("");

        // If more questions remain
        if (newStep < fields.length) {
            setStep(newStep);
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [...prev, { sender: "bot", text: fields[newStep].question }]);
            }, 1000);

            return;
        }

        // Final Step — Submit to Backend
        setMessages((prev) => [...prev, { sender: "bot", text: "⏳ Saving your expense..." }]);

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

                setTimeout(() => {
                    navigate("/dailyExpensesDashboard");
                }, 2000);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "❌ Something went wrong. Please try again." },
                ]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Server error. Try again later." },
            ]);
        }
    };

    return (
        <div className="chat-container">

            {/* Header */}
            <div className="chat-header">
                <img src={botAvatar} alt="Bot" className="bot-avatar" />
                <div>
                    <h3>Daily Expense Assistant 🤖</h3>
                    <p>Online now</p>
                </div>
            </div>

            {/* Chat Box */}
            <div className="chat-box">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.sender}`}>
                        {msg.sender === "bot" && (
                            <img src={botAvatar} alt="bot" className="bot-icon" />
                        )}
                        <p>{msg.text}</p>
                    </div>
                ))}

                {/* Typing animation */}
                {isTyping && (
                    <div className="message bot typing">
                        <img src={botAvatar} alt="bot" className="bot-icon" />
                        <div className="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form className="input-area" onSubmit={handleSend}>
                
                {/* TEXT INPUT for first 2 questions */}
                {step !== 2 && (
                    <input
                        type="text"
                        placeholder="Type your answer..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                )}

                {/* DATE PICKER for last question */}
                {step === 2 && (
                    <DatePickerInput
                        label=""
                        value={formData.dateOfExpenses || ""}
                        onChange={(val) => setFormData({ ...formData, dateOfExpenses: val })}
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
