// src/components/PaymentHistory.js
import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase';
import '../styles/PaymentHistory.css'; // Import the CSS file for styling

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const historyRef = ref(database, 'paymentHistory');
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const historyArray = Object.entries(data).map(([id, transaction]) => ({
          id,
          ...transaction
        })).sort((a, b) => new Date(b.date) - new Date(a.date));

        setPaymentHistory(historyArray);
        applyFilter(historyArray, filterType);
      }
    });
  }, [filterType]);

  const applyFilter = (data, type) => {
    let filtered = [];
    const now = new Date();

    switch (type) {
      case 'Today':
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        filtered = data.filter(({ date }) => new Date(date) >= startOfDay);
        break;
      case 'Last 3 months':
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        filtered = data.filter(({ date }) => new Date(date) >= threeMonthsAgo);
        break;
      case 'Last 6 months':
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        filtered = data.filter(({ date }) => new Date(date) >= sixMonthsAgo);
        break;
      case 'Last 12 months':
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(now.getMonth() - 12);
        filtered = data.filter(({ date }) => new Date(date) >= twelveMonthsAgo);
        break;
      case 'Custom':
        if (!startDate || !endDate) {
          alert("Please select both start and end dates.");
          return;
        }
        filtered = data.filter(({ date }) => {
          const transactionDate = new Date(date);
          return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
        });
        break;
      case 'All':
      default:
        filtered = data;
    }

    setFilteredHistory(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleDateFilter = () => {
    applyFilter(paymentHistory, 'Custom');
  };

  const paginate = (array, page_number) => {
    const start = (page_number - 1) * itemsPerPage;
    return array.slice(start, start + itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = paginate(filteredHistory, currentPage);

  return (
    <div className="payment-history-container">
      <h2 className="payment-history-heading">Payment History</h2>
      <div className="filter-options">
        <label>
          Filter By:
          <select value={filterType} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Last 3 months">Last 3 months</option>
            <option value="Last 6 months">Last 6 months</option>
            <option value="Last 12 months">Last 12 months</option>
            <option value="Custom">Custom</option>
          </select>
        </label>
        {filterType === 'Custom' && (
          <div className="date-filter">
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button onClick={handleDateFilter}>Filter</button>
          </div>
        )}
      </div>
      <ul className="payment-history-list">
        {paginatedHistory.length > 0 ? (
          paginatedHistory.map(({ id, amount, units, date }) => (
            <li key={id} className="payment-history-item">
              <p>Amount: <span>₹{amount}</span></p>
              <p>Units Recharged: <span>{units} kWh</span></p>
              <p>Date: <span>{new Date(date).toLocaleString()}</span></p>
            </li>
          ))
        ) : (
          <li className="payment-history-item">No records found for the selected filter.</li>
        )}
      </ul>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
