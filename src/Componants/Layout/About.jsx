import React from "react";
import "../../Styles/Layout/About.css";
import Header from "./Header";
import Footer from "./Footer";

const About = () => {
  return (
    <>
    <Header/>
    <div className="about-container">
      <div className="about-content">
        <h1>About Coro EMI Assistant 🤖</h1>
        <p>
          Welcome to <strong>Shop@99 EMI Assistant</strong> — your smart financial companion for
          managing loans, EMIs, and repayments efficiently. Our platform is designed to make loan
          management simple, transparent, and accessible to everyone.
        </p>

        <div className="about-section">
          <h2>🌟 Our Mission</h2>
          <p>
            To empower customers with real-time EMI tracking and financial insights through an
            interactive and easy-to-use chatbot interface. We believe managing finances should be as
            simple as chatting with a friend.
          </p>
        </div>

        <div className="about-section">
          <h2>💼 What We Offer</h2>
          <ul>
            <li>📊 Smart EMI and Loan Management Dashboard</li>
            <li>💬 AI-powered chatbot for EMI registration and updates</li>
            <li>📅 Easy EMI scheduling and repayment tracking</li>
            <li>🔒 Secure and transparent data handling</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>🚀 Our Vision</h2>
          <p>
            We aim to redefine how people interact with financial tools — making them
            conversational, intelligent, and fun to use.
          </p>
        </div>

        <footer className="about-footer">
          <p>© {new Date().getFullYear()} Coro EMI Assistant | Built with ❤️ by Deepak Yadav</p>
        </footer>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default About;
