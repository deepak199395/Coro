import React from 'react';
import Header from '../Componants/Layout/Header';
import Footer from '../Componants/Layout/Footer';
import MainHomw from './MainHomw'; // (assuming this is your main content)
import "../Styles/Home/Home.css"
const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="home-content">
        <MainHomw />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
