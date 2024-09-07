import React, { useState } from 'react';
import Modal from 'react-modal';
// import { useContext } from 'react';
// import { Namecontext } from '../App';


const OrderProgressBar = ({ orders, customerOrders }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const maxWidth = 650;

  const getColor = (count) => {
    if (count < 5) return '#D2122E';
    if (count < 14) return '#fd5c63';
    return '#87A96B';
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDay(null);
  };

  return (
    <div className="order-progress-bar" id="order-progress-bar">
      {orders.map((count, index) => (
        <div key={index} className="progress-bar-day" id={`progress-bar-day-${days[index]}`}>
          <div className="day-name" id={`day-name-${days[index]}`} onClick={() => openModal(days[index])}>
            {days[index]}
          </div>
          <div
            className="progress-bar"
            id={`progress-bar-${days[index]}`}
            style={{ width: `${(count / 20) * maxWidth}px`, backgroundColor: getColor(count) }}
          >
            {count} orders
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Customer Orders"
        className="report-modal"
        overlayClassName="report-modal-overlay"
        id="order-modal"
      >
        <div className="modal-content" id="order-modal-content">
          <button className="close-button" id="order-modal-close-button" onClick={closeModal}>
            &times;
          </button>
          <h2 id="order-modal-title">{selectedDay} Orders</h2>
          {selectedDay && (
            <ul id="order-customer-list">
              {customerOrders[selectedDay].map((customer, idx) => (
                <li key={idx} id={`customer-${idx}`}>{customer}</li>
              ))}
            </ul>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default OrderProgressBar;
