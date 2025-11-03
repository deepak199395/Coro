import React from 'react';
import '../../Styles/Layout/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">Coro</div>
      <nav className="header-nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>
        <a href="/contact" className="nav-link">Services</a>
        <a href="/contact" className="nav-link">login</a>

      </nav>
    </header>
  );
};

export default Header;
