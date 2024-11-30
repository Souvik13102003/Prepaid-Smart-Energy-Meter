import React, { useEffect } from 'react';
import '../styles/WarningMessage.css';
import axios from 'axios';

const WarningMessage = ({ balance }) => {
  let message = '';
  let className = '';

  if (balance === 0) {
    message = 'Warning: Your balance is zero. Please recharge.';
    className = 'warning-zero';
  } else if (balance > 0 && balance < 100) {
    message = 'Warning: Low balance. Please recharge soon.';
    className = 'warning-low';
  }

  useEffect(() => {
    if (message) {
      axios.post('http://localhost:5000/api/send-alert', { balance })
        .then(response => {
          console.log('Alert sent:', response.data);
        })
        .catch(error => {
          console.error('Error sending alert:', error);
        });
    }
  }, [balance, message]);

  return (
    <div className="warning-container">
      {message && (
        <div className={className}>
          {message}
        </div>
      )}
    </div>
  );
};

export default WarningMessage;
