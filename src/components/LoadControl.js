// src/components/LoadControl.js
import React, { useState, useEffect } from 'react';
import { database, ref, set, onValue } from '../firebase';
import '../styles/LoadControl.css'; // Import CSS for styling

const LoadControl = () => {
  const [bulbs, setBulbs] = useState({
    bulb1: false,
    bulb2: false,
    bulb3: false,
  });
  const [balance, setBalance] = useState(0);
  const [units, setUnits] = useState(0);

  useEffect(() => {
    // Fetch and listen to bulbs state
    const bulbsRef = ref(database, 'bulbs');
    onValue(bulbsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBulbs(data);
      }
    });

    // Fetch and listen to balance
    const balanceRef = ref(database, 'balance');
    onValue(balanceRef, (snapshot) => {
      setBalance((snapshot.val() || 0).toFixed(2)); // Show balance up to 2 decimal places
    });

    // Fetch and listen to units
    const unitsRef = ref(database, 'units');
    onValue(unitsRef, (snapshot) => {
      setUnits((snapshot.val() || 0).toFixed(2)); // Show units up to 2 decimal places
    });
  }, []);

  const toggleBulb = (bulbId) => {
    // Check if balance and units are greater than zero before toggling
    if (balance > 0 && units > 0) {
      const newState = !bulbs[bulbId];
      const bulbRef = ref(database, `bulbs/${bulbId}`);
      set(bulbRef, newState)
        .then(() => console.log(`${bulbId} turned ${newState ? 'ON' : 'OFF'}`))
        .catch((error) => console.error('Error updating bulb state: ', error));
    } else {
      alert('Cannot turn ON the loads. Please recharge your balance or units.');
    }
  };

  return (
    <div className="load-control-wrapper">
      <div className="balance-info">
        <p>Balance: <span>₹{balance}</span></p>
        <p>Units: <span>{units} kWh</span></p>
      </div>

      <div className="load-control-container">
        <h2 className='load-control-heading'>Load Control</h2>
        <div className="button-container">
          <button
            className={`bulb-button ${bulbs.bulb1 ? 'on' : 'off'}`}
            onClick={() => toggleBulb('bulb1')}
          >
            {bulbs.bulb1 ? 'Turn Bulb 1 OFF' : 'Turn Bulb 1 ON'}
          </button>
          <button
            className={`bulb-button ${bulbs.bulb2 ? 'on' : 'off'}`}
            onClick={() => toggleBulb('bulb2')}
          >
            {bulbs.bulb2 ? 'Turn Bulb 2 OFF' : 'Turn Bulb 2 ON'}
          </button>
          <button
            className={`bulb-button ${bulbs.bulb3 ? 'on' : 'off'}`}
            onClick={() => toggleBulb('bulb3')}
          >
            {bulbs.bulb3 ? 'Turn Bulb 3 OFF' : 'Turn Bulb 3 ON'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadControl;
