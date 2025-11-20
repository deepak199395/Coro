import React from 'react';
import Header from '../Componants/Layout/Header';
import Footer from '../Componants/Layout/Footer';
import "../Styles/DailyExpenses/DailyExpensesStyle.css";
import { useNavigate } from 'react-router-dom';

const DailyExpenses = () => {
const navigate = useNavigate();
  
const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <div className="daily-expense-container">

        <h2 className="page-title">💰 Daily Expenses</h2>
        <p className="page-subtitle">Manage your daily spending in one place</p>

        <div className="expense-grid">

          <div className="expense-section card-click"  onClick={() => handleNavigation('/dailyExpensesDashboard')}>
            <h2>📄 View Daily Expenses</h2>
            <p>See all your expense records</p>
          </div>

          <div className="expense-section card-click" onClick={() => handleNavigation('/commingSoon')}>
            <h2>➕ Add Daily Expense</h2>
            <p>Record a new expense using chatbot</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DailyExpenses;
