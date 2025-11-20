import React, { useEffect, useState } from "react";
import "../../Styles/DailyExpenses/DailyExpensesDashboard.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const DailyExpensesDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetch(
      "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/expess-deatils/fox-getExpensse/api44"
    )
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data.getexpess);
        setFiltered(data.getexpess);
      });
  }, []);

  // 🔍 Search + Filter Logic
  useEffect(() => {
    let result = expenses;

    if (search) {
      result = result.filter((e) =>
        e.reasonOfExpenses.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (monthFilter) {
      result = result.filter((e) => e.dateOfExpenses.startsWith(monthFilter));
    }

    if (categoryFilter) {
      result = result.filter((e) =>
        e.reasonOfExpenses.toLowerCase().includes(categoryFilter)
      );
    }

    setFiltered(result);
  }, [search, monthFilter, categoryFilter, expenses]);

  // 📊 Monthly Bar Chart
  const monthlyTotals = {};
  expenses.forEach((e) => {
    const month = e.dateOfExpenses.slice(0, 7); // YYYY-MM
    monthlyTotals[month] = (monthlyTotals[month] || 0) + parseInt(e.expenses);
  });

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expense",
        data: Object.values(monthlyTotals),
        backgroundColor: "#128C7E",
      },
    ],
  };

  // 🎨 Pie Chart - Category
  const categoryTotals = {};
  expenses.forEach((e) => {
    const category = e.reasonOfExpenses;
    categoryTotals[category] = (categoryTotals[category] || 0) + parseInt(e.expenses);
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "By Category",
        data: Object.values(categoryTotals),
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#FF5722", "#9C27B0"],
      },
    ],
  };

  // 📄 Download PDF
  const downloadPDF = () => {
    const capture = document.querySelector(".dashboard-wrapper");
    html2canvas(capture).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 0);
      pdf.save("daily_expense_report.pdf");
    });
  };

  // 🧮 Summary Cards
  const totalAmount = filtered.reduce((a, b) => a + parseInt(b.expenses), 0);
  const highestExpense = Math.max(...filtered.map((e) => parseInt(e.expenses)), 0);
  const today = new Date().toISOString().slice(0, 10);
  const todaySpent = filtered
    .filter((e) => e.dateOfExpenses === today)
    .reduce((a, b) => a + parseInt(b.expenses), 0);

  return (
    <div className="dashboard-wrapper">

      <h1 className="dashboard-title">📊 Daily Expense Dashboard</h1>

      {/* 🟦 Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{totalAmount}</p>
        </div>
        <div className="card">
          <h3>Highest Expense</h3>
          <p>₹{highestExpense}</p>
        </div>
        <div className="card">
          <h3>Today's Expense</h3>
          <p>₹{todaySpent}</p>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by category..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
        />
      </div>

      <button className="pdf-btn" onClick={downloadPDF}>📥 Download PDF</button>

      {/* 📊 Charts */}
      <div className="charts-container">
        <div className="chart-box">
          <h3>Monthly Bar Chart</h3>
          <Bar data={barData} />
        </div>

        <div className="chart-box">
          <h3>Category Pie Chart</h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* 📄 Expense List */}
      <h2 className="list-title">🧾 All Expenses</h2>
      <div className="expense-list">
        {filtered.map((e) => (
          <div className="expense-item" key={e._id}>
            <p><strong>{e.reasonOfExpenses}</strong></p>
            <p>₹{e.expenses}</p>
            <p>{e.dateOfExpenses}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyExpensesDashboard;
