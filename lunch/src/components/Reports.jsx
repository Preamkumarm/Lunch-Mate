import React, { useState } from 'react';
import './Reports.css';

const Reports = ({ customerOrders }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const today = new Date();
  
  const getDate = (day) => {
    const dayIndex = days.indexOf(day);
    const date = new Date(today.setDate(today.getDate() - today.getDay() + dayIndex + 1));
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getColor = (count) => {
    if (count < 5) return '#D2122E';
    if (count < 10) return '#fd5c63';
    if (count < 15) return '#87A96B'; 
    return '#002D62'; 
  };

  return (
    <div className="reports" id="reports">
      <h2 id="reports-title">Customer Orders Report</h2>
      {days.map((day, index) => {
        const orderCount = customerOrders[day]?.length || 0;
        const date = getDate(day);

        return (
          <div key={index} className="report-day" id={`report-day-${day}`}>
            <div className="day-header" id={`day-header-${day}`}>
              <h3 id={`day-title-${day}`}>{day}</h3>
              <span className="date-info" id={`date-info-${day}`}>
                {date} - <span id={`order-count-${day}`} style={{ color: getColor(orderCount) }}>{orderCount} orders</span>
              </span>
              <button 
                className="dropdown-button" 
                id={`dropdown-button-${day}`}
                onClick={() => setExpandedDay(expandedDay === day ? null : day)}
              >
                {expandedDay === day ? '▲' : '▼'}
              </button>
            </div>
            {expandedDay === day && (
              <ul id={`customer-list-${day}`}>
                {customerOrders[day]?.map((customer, idx) => (
                  <li key={idx} id={`customer-${day}-${idx}`}>{customer}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Reports;
