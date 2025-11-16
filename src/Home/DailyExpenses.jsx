import React from 'react'
import Header from '../Componants/Layout/Header'
import Footer from '../Componants/Layout/Footer'
import "../Styles/DailyExpenses/DailyExpensesStyle.css"

const DailyExpenses = () => {
  return (
    <div className="page-wrapper">
      <Header/>

      <div className="daily-expense-container">

        <h2 className="page-title">Daily Expenses</h2>

        <div className="expense-grid">

          <div className="expense-section card-click">
            <h2>📄 View Daily Expenses</h2>
          </div>

          <div className="expense-section card-click">
            <h2>➕ Add Daily Expenses</h2>
          </div>

        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default DailyExpenses
