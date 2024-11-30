// src/components/Footer.js
import React, { useState, useEffect } from 'react';
import '../styles/Footer.css'; // Import the CSS file for styling

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show the scroll-to-top button when scrolled down
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>Project Members</h3>
        <ul>
          <li>Souvik Sardars</li>
          <li>Saranya Mukherjee</li>
          <li>Pratyusha Das</li>
          
        </ul>
      </div>

      <div className="footer-section">
        <h3>Project Coordinator</h3>
        <p>Pradipta Das</p>
      </div>

      <div className="footer-section">
        <h3>College Info</h3>
        <p>Techno Main Salt Lake</p>
        <p>EM-4/1, Sector V, Bidhannagar</p>
        <p>Kolkata, West Bengal 700091</p>
      </div>

      <div className="footer-section">
        <h3>Batch & Department</h3>
        <p>Department: Electrical Engineering</p>
        <p>Batch: 2021-25</p>
        <p>Session: 2024-25</p>
      </div>

      <div className="footer-section">
        <h3>College Logo</h3>
        <img src="/tmsl-logo.png" alt="College Logo" className="college-logo" />
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </footer>
  );
};

export default Footer;
