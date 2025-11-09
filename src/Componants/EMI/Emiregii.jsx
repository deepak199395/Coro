import React, { useState, useEffect, useRef } from "react";
import "../../Styles/EmiregiStyle/EmiStyle.css";

const EmiChatBot = () => {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! Let’s register your EMI. What’s your Customer ID?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [formData, setFormData] = useState({});
  const chatEndRef = useRef(null);

  const fields = [
    { key: "customerId", question: "What’s your Customer ID?" },
    { key: "customerName", question: "What’s your full name?" },
    { key: "loanAmount", question: "What’s your Loan Amount?" },
    { key: "rateOfInterestPerAnnum", question: "Interest Rate per annum (e.g. 33%)?" },
    { key: "interestRateType", question: "Interest Rate Type (Fixed / Floating)?" },
    { key: "loanTenureInMonths", question: "Loan Tenure in months?" },
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const currentField = fields[step];
    const newMessages = [
      ...messages,
      { sender: "user", text: userInput },
    ];

    setFormData({ ...formData, [currentField.key]: userInput });
    setUserInput("");

    if (step + 1 < fields.length) {
      const nextQuestion = fields[step + 1].question;
      setMessages([...newMessages, { sender: "bot", text: nextQuestion }]);
      setStep(step + 1);
    } else {
      // Final step: submit data
      setMessages([...newMessages, { sender: "bot", text: "⏳ Submitting your EMI data..." }]);
      try {
        const res = await fetch(
          "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/emi/createEmi/api41",
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
            { sender: "bot", text: "✅ EMI registered successfully!" },
          ]);
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
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {step < fields.length && (
        <form className="input-area" onSubmit={handleSend}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default EmiChatBot;
