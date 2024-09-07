import React from 'react';

const WeeklyOrdersProgressBar = ({ orders }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const maxWidth = 650;

  const getColor = (count) => {
    return count > 14 ? '#454555' : '#7a748a';
  };

  return (
    <div className="weekly-orders-progress-bar" id="weekly-orders-progress-bar">
      {orders.map((count, index) => (
        <div key={index} className="progress-bar-day" id={`weekly-progress-bar-day-${days[index]}`}>
          <div className="day-name" id={`weekly-day-name-${days[index]}`}>{days[index]}</div>
          <div
            className="progress-bar"
            id={`weekly-progress-bar-${days[index]}`}
            style={{ width: `${(count / 20) * maxWidth}px`, backgroundColor: getColor(count) }}
          >
            {count} orders
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyOrdersProgressBar;
