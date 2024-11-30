import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase';
import '../styles/RealTimeData.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faTachometerAlt, faThermometerHalf, faChartLine, faSyncAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';

const RealTimeData = () => {
  const [parameters, setParameters] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    energy: 0,
    frequency: 0,
    powerFactor: 0,
  });

  const [balance, setBalance] = useState(0);
  const [units, setUnits] = useState(0);

  useEffect(() => {
    const paramsRef = ref(database, 'parameters');
    onValue(paramsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setParameters(data);
      }
    });

    // Fetch balance and units from Firebase
    const balanceRef = ref(database, 'balance');
    const unitsRef = ref(database, 'units');

    onValue(balanceRef, (snapshot) => {
      const balanceData = snapshot.val();
      if (typeof balanceData === 'number') {
        setBalance(balanceData);
      }
    });

    onValue(unitsRef, (snapshot) => {
      const unitsData = snapshot.val();
      if (typeof unitsData === 'number') {
        setUnits(unitsData);
      }
    });
  }, []);

  return (
    <div className="realtime-data-wrapper">
      <div className="balance-info2">
        <p>Balance: <span>₹{balance.toFixed(2)}</span></p>
        <p>Units: <span>{units.toFixed(2)} kWh</span></p>
      </div>

      <div className="realtime-data-container">
        <h2 className="realtime-heading">Real-Time Data</h2>
        <div className="data-grid">
          <div className="data-card">
            <FontAwesomeIcon icon={faBolt} size="2x" className="data-icon" />
            <h3>Voltage</h3>
            <p>{parameters.voltage} V</p>
          </div>
          <div className="data-card">
            <FontAwesomeIcon icon={faTachometerAlt} size="2x" className="data-icon" />
            <h3>Current</h3>
            <p>{parameters.current} A</p>
          </div>
          <div className="data-card">
            <FontAwesomeIcon icon={faPowerOff} size="2x" className="data-icon" />
            <h3>Power</h3>
            <p>{parameters.power} W</p>
          </div>
          <div className="data-card">
            <FontAwesomeIcon icon={faThermometerHalf} size="2x" className="data-icon" />
            <h3>Energy</h3>
            <p>{parameters.energy} kWh</p>
          </div>
          <div className="data-card">
            <FontAwesomeIcon icon={faChartLine} size="2x" className="data-icon" />
            <h3>Frequency</h3>
            <p>{parameters.frequency} Hz</p>
          </div>
          <div className="data-card">
            <FontAwesomeIcon icon={faSyncAlt} size="2x" className="data-icon" />
            <h3>Power Factor</h3>
            <p>{parameters.powerFactor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
