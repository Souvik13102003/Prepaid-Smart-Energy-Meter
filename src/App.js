// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import { database, ref, onValue } from './firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadControl from './components/LoadControl';
import RealTimeData from './components/RealTimeData';
import Recharge from './components/Recharge';
import PaymentHistory from './components/PaymentHistory';
import Introduction from './components/Introduction';
import Conclusion from './components/Conclusion';
import WarningMessage from './components/WarningMessage';

const App = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const balanceRef = ref(database, 'balance');
    onValue(balanceRef, (snapshot) => {
      const data = snapshot.val();
      if (typeof data === 'number') setBalance(data);
    });
  }, []);

  // Custom component to handle conditional WarningMessage
  const ConditionalWarningMessage = ({ children }) => {
    const location = useLocation();
    const showWarning =
      location.pathname === '/loadcontrol' ||
      location.pathname === '/realtimedata' ||
      location.pathname === '/recharge' ||
      location.pathname === '/paymenthistory';

    return (
      <>
        {showWarning && <WarningMessage balance={balance} />}
        {children}
      </>
    );
  };

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route
            path="/loadcontrol"
            element={
              <ConditionalWarningMessage>
                <LoadControl />
              </ConditionalWarningMessage>
            }
          />
          <Route
            path="/realtimedata"
            element={
              <ConditionalWarningMessage>
                <RealTimeData />
              </ConditionalWarningMessage>
            }
          />
          <Route
            path="/recharge"
            element={
              <ConditionalWarningMessage>
                <Recharge />
              </ConditionalWarningMessage>
            }
          />
          <Route
            path="/paymenthistory"
            element={
              <ConditionalWarningMessage>
                <PaymentHistory />
              </ConditionalWarningMessage>
            }
          />
          <Route path="/conclusion" element={<Conclusion />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
