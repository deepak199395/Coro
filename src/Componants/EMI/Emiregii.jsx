import React, { useState, useEffect, useRef } from "react";
import "../../Styles/EmiregiStyle/EmiStyle.css";
import { FaPaperPlane } from "react-icons/fa";
import botAvatar from "../../Assets/botAvatar.png";
import { useNavigate } from "react-router-dom";
import DatePickerInput from "../Common/DatePickerInput";

const EmiChatBot = () => {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [formData, setFormData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const navigate = useNavigate();

  const fields = [
    { key: "customerName", question: "What’s your full name?" },
    { key: "FinanceCompany", question: "What’s your Registered Finance Company?" },
    { key: "registeredEmail", question: "What’s your Registered Email?" },
    { key: "registeredMobile", question: "What’s your Registered Phone?" },
    { key: "loanAmount", question: "What’s your Loan Amount?" },
    { key: "rateOfInterestPerAnnum", question: "Interest Rate per annum (e.g. 33%)?" },
    { key: "interestRateType", question: "Interest Rate Type (Fixed / Floating)?" },
    { key: "loanTenureInMonths", question: "Loan Tenure (Months)?" },
    { key: "RemainloanTenureInMonths", question: "Remaining Loan Tenure (Months)?" },
    { key: "totalLoanAmountRepaid", question: "Total Loan Amount Repaid?" },
    { key: "instalmentAmount", question: "Monthly Instalment Amount?" },
    { key: "loanCreationDate", question: "Loan Creation Date?" },
    { key: "firstInstalmentDate", question: "First Instalment Date?" },
    { key: "instalmentEndDate", question: "Instalment End Date?" },
    { key: "totalOutstandingAmount", question: "Total Outstanding Amount?" },
    { key: "outstandingLoanAmount", question: "Outstanding Loan Amount?" },
    { key: "futurePrincipalComponent", question: "Future Principal Component?" },
    { key: "futureInterestComponent", question: "Future Interest Component?" },
    { key: "futureInstalmentNumber", question: "Future Instalment Number?" },
    { key: "loanStatus", question: "Loan Status (Active / Closed)?" },
  ];

  // Auto-scroll 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ----------- 🗣️ FEMALE VOICE (same as your Daily Expenses chatbot) ------------
  const speak = (text, gender = "female") => {
    if (!window.speechSynthesis) return;

    const msg = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    const selectedVoice = voices.find((v) =>
      gender === "female"
        ? v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("zira")
        : v.name.toLowerCase().includes("male")
    );

    if (selectedVoice) msg.voice = selectedVoice;

    msg.pitch = 1;
    msg.rate = 1;

    window.speechSynthesis.speak(msg);
  };

  // Initial bot welcome
  useEffect(() => {
    const randomId = Math.floor(1000000 + Math.random() * 9000000).toString();
    setFormData((prev) => ({ ...prev, customerId: randomId }));

    setMessages([
      { sender: "bot", text: "👋 Hi! I'm your EMI Assistant." },
      { sender: "bot", text: `Your Customer ID 🪪 is <b>${randomId}</b>.` },
      { sender: "bot", text: fields[0].question },
    ]);

    // Speak messages
    speak("Hi, I'm your EMI Assistant.", "female");
    setTimeout(() => speak("Your customer ID is " + randomId, "female"), 700);
    setTimeout(() => speak(fields[0].question, "female"), 1200);
  }, []);

  // ----------- HANDLE SEND ----------
  const handleSend = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const currentField = fields[step];

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setFormData({ ...formData, [currentField.key]: userInput });

    const nextStep = step + 1;
    setUserInput("");

    if (nextStep < fields.length) {
      setStep(nextStep);
      setIsTyping(true);

      setTimeout(() => {
        const nextQuestion = fields[nextStep].question;

        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: nextQuestion },
        ]);

        speak(nextQuestion, "female"); // 🔥 Bot speaks the next question
      }, 900);

      return;
    }

    // Final submit
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⏳ Submitting your EMI details..." },
    ]);
    speak("Submitting your EMI details", "female");

    try {
      const res = await fetch(
        "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/foxEMI/FOX-EMI/api41",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.status) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "✅ EMI registered successfully! 🎉" },
        ]);
        speak("EMI registered successfully", "female");

        setTimeout(() => navigate("/emidashboard"), 2000);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Something went wrong." },
        ]);
        speak("Something went wrong. Please try again.", "female");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Try again later." },
      ]);
      speak("Server error. Please try again later.", "female");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
        <div>
          <h3>EMI Assistant 🤖</h3>
          <p>Online now</p>
        </div>
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.sender === "bot" && (
              <img src={botAvatar} className="bot-icon" alt="bot" />
            )}
            <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
          </div>
        ))}

        {isTyping && (
          <div className="message bot typing">
            <img src={botAvatar} className="bot-icon" alt="bot" />
            <div className="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT AREA */}
      {step < fields.length && (
        <form className="input-area" onSubmit={handleSend}>
          {["loanCreationDate","firstInstalmentDate","instalmentEndDate"].includes(
            fields[step].key
          ) ? (
            <DatePickerInput
              value={userInput}
              onChange={(val) => setUserInput(val)}
            />
          ) : (
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
            />
          )}

          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      )}
    </div>
  );
};

export default EmiChatBot;
