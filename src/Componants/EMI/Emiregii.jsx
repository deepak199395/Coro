import React, { useState, useEffect, useRef } from "react";
import "../../Styles/EmiregiStyle/EmiStyle.css";
import { FaPaperPlane } from "react-icons/fa";
import botAvatar from "../../Assets/botAvatar.png";

const EmiChatBot = () => {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [formData, setFormData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const fields = [
    { key: "customerName", question: "What’s your full name?" },
    { key: "loanAmount", question: "What’s your Loan Amount?" },
    { key: "rateOfInterestPerAnnum", question: "Interest Rate per annum (e.g. 33%)?" },
    { key: "interestRateType", question: "Interest Rate Type (Fixed / Floating)?" },
    { key: "loanTenureInMonths", question: "Loan Tenure (Months)?" },
    { key: "totalLoanAmountRepaid", question: "Total Loan Amount Repaid?" },
    { key: "instalmentAmount", question: "Monthly Instalment Amount?" },
    { key: "loanCreationDate", question: "Loan Creation Date (e.g. 09-Apr-2023)?" },
    { key: "firstInstalmentDate", question: "First Instalment Date?" },
    { key: "instalmentEndDate", question: "Instalment End Date?" },
    { key: "totalOutstandingAmount", question: "Total Outstanding Amount?" },
    { key: "outstandingLoanAmount", question: "Outstanding Loan Amount?" },
    { key: "futurePrincipalComponent", question: "Future Principal Component?" },
    { key: "futureInterestComponent", question: "Future Interest Component?" },
    { key: "futureInstalmentNumber", question: "Future Instalment Number?" },
    { key: "loanStatus", question: "Loan Status (Active / Closed)?" },
  ];

  // Auto-scroll on every message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-generate random 7-digit Customer ID
  useEffect(() => {
    const randomId = Math.floor(1000000 + Math.random() * 9000000).toString();
    setFormData((prev) => ({ ...prev, customerId: randomId }));

    setMessages([
      { sender: "bot", text: "👋 Hi! I'm your EMI Assistant." },
      { sender: "bot", text: `Your Customer ID 🪪 is <b>${randomId}</b>. Please remember this.` },
    ]);

    // Show first question after typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: "Let's start — What’s your full name?" }]);
    }, 1200);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const currentField = fields[step];
    const newMessages = [...messages, { sender: "user", text: userInput }];

    setFormData({ ...formData, [currentField.key]: userInput });
    setUserInput("");

    // If more questions left
    if (step + 1 < fields.length) {
      const nextQuestion = fields[step + 1].question;
      setMessages(newMessages);
      setIsTyping(true);

      // Simulate bot typing for 1 second
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: "bot", text: nextQuestion }]);
        setStep(step + 1);
      }, 1000);
    } else {
      // Submit data
      setMessages([...newMessages, { sender: "bot", text: "⏳ Submitting your EMI details..." }]);
      try {
        const res = await fetch(
          "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/foxEMI/FOX-EMI/api41",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, [currentField.key]: userInput }),
          }
        );

        const data = await res.json();
        if (data.status) {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "✅ EMI registered successfully! 🎉" },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "❌ Something went wrong. Please try again." },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Server error. Try again later." },
        ]);
      }
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
        <div>
          <h3>EMI Assistant 🤖</h3>
          <p>Online now</p>
        </div>
      </div>

      {/* Chat box */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.sender === "bot" && <img src={botAvatar} alt="bot" className="bot-icon" />}
            <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
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

      {/* Input area */}
      {step < fields.length && (
        <form className="input-area" onSubmit={handleSend}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      )}
    </div>
  );
};

export default EmiChatBot;
