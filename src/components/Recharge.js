import React, { useState, useEffect } from 'react';
import { database, ref, set, onValue, push } from '../firebase';
import '../styles/Recharge.css';

const Recharge = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [units, setUnits] = useState(0);
  const costPerUnit = 9; // Assuming ₹9 per unit (kWh)

  useEffect(() => {
    const balanceRef = ref(database, 'balance');
    const unitsRef = ref(database, 'units');

    onValue(balanceRef, (snapshot) => {
      const data = snapshot.val();
      if (typeof data === 'number') setBalance(data);
    });

    onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      if (typeof data === 'number') setUnits(data);
    });
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRecharge = async () => {
    const rechargeAmount = parseFloat(amount);
    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
      alert('Please enter a valid recharge amount.');
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert('Failed to load Razorpay SDK. Check your connection.');
      return;
    }

    const options = {
      key: 'rzp_test_kP6RIXxHAJh573', // Replace with your Razorpay Key ID
      amount: rechargeAmount * 100, // Amount in paise (₹1 = 100 paise)
      currency: 'INR',
      name: 'Prepaid Smart Energy Meter',
      description: 'Recharge Balance',
      handler: function (response) {
        const newBalance = balance + rechargeAmount;
        const newUnits = units + rechargeAmount / costPerUnit;

        // Update Firebase
        set(ref(database, 'balance'), newBalance);
        set(ref(database, 'units'), newUnits);
        push(ref(database, 'paymentHistory'), {
          amount: rechargeAmount,
          units: (rechargeAmount / costPerUnit).toFixed(2),
          date: new Date().toISOString(),
        });

        setAmount('');
        alert('Payment successful!');
      },
      prefill: {
        name: 'Prepaid Smart Energy Meter',
        email: 'your.email@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="recharge-wrapper">
      <div className="balance-info1">
        <p>Balance: <span>₹{balance.toFixed(2)}</span></p>
        <p>Units: <span>{units.toFixed(2)} kWh</span></p>
      </div>
      <div className="recharge-container">
        <h2 className="recharge-heading">Recharge Your Account</h2>
        <div className="recharge-form">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter recharge amount (₹)"
            className="recharge-input"
          />
          <button onClick={handleRecharge} className="recharge-button">
            Recharge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
