import React, { useState } from 'react';
import '../../Styles/Layout/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-logo">Coro</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      {/* Navigation Menu */}
      <nav className={`header-nav ${isOpen ? 'active' : ''}`}>
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/services" className="nav-link">Services</a>
        <a href="/contact" className="nav-link">Contact</a>
        <a href="/login" className="nav-link">Login</a>
      </nav>
    </header>
  );
};

export default Header;
