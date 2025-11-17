import React from "react";
import "../../Styles/Layout/Contact.css";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
  return (
    <>
    <Header/>
     <div className="contact-container">
      <div className="contact-card">

        <h1>Contact Us 📞</h1>
        <p className="subtitle">
          We’d love to hear from you! Reach out for support, queries, or feedback.
        </p>

        <div className="contact-info">
          <div className="info-box">
            <h3>📍 Address</h3>
            <p>Coro EMI Assistant Headquarters</p>
            <p>Pune Hinzewadi, India</p>
          </div>

          <div className="info-box">
            <h3>📧 Email</h3>
            <p>support@shop99.com</p>
            <p>helpdesk@shop99.com</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+91 9322096941</p>
            <p>+91 9322096941</p>
          </div>

          <div className="info-box">
            <h3>🌐 Social Media</h3>
            <p>Instagram: @shop99_assistant</p>
            <p>Facebook: Shop99 EMI</p>
          </div>
        </div>

        <footer className="contact-footer">
          © {new Date().getFullYear()} Coro EMI Assistant | All Rights Reserved
        </footer>

      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default Contact;
