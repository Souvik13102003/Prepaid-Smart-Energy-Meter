// src/components/Introduction.js
import React, { useState, useEffect } from 'react';
import '../styles/Introduction.css'; // Import the CSS file for styling

const Introduction = () => {
  // Carousel state
  const [currentImage, setCurrentImage] = useState(0);
  
  // Carousel images (replace these with actual URLs or import them)
  const projectImages = [
    '/carousel1.png', 
    '/carousel2.jpg', 
    '/carousel3.jpg', 
    '/carousel1.png', 
    '/carousel2.jpg'
  ];

  // Function to handle next image in carousel
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % projectImages.length);
  };

  // Function to handle previous image in carousel
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="introduction-container">
      <h2>Introduction</h2>
      
      {/* Carousel */}
      <div className="carousel-container">
        <button className="carousel-arrow left" onClick={prevImage}>❮</button>
        <img 
          src={projectImages[currentImage]} 
          alt={`Project ${currentImage + 1}`} 
          className="carousel-image" 
        />
        <button className="carousel-arrow right" onClick={nextImage}>❯</button>
      </div>

      {/* Project Description */}
      <div className="project-details">
        <h3>Project Overview</h3>
        <p>
          Our project, the "Prepaid Smart Energy Meter," aims to revolutionize how energy consumption is managed and monitored in households and businesses. 
          This system allows users to control three loads remotely, monitor real-time energy data (current, voltage, and power), and manage prepaid balances. 
          When the balance runs out, the system automatically switches off the loads. Recharging is done online, and the payment history is saved in Firebase. 
          A PZEM-004T energy meter tracks the energy parameters, while Firebase Cloud facilitates data storage and synchronization.
        </p>
      </div>

      {/* Components Section */}
      <div className="components-section">
        <h3>Components Used</h3>
        <div className="components-list">
          <div className="component-item">
            <img src="/esp32.png" alt="ESP32" className="component-image"/>
            <p>ESP32 - Microcontroller</p>
          </div>
          <div className="component-item">
            <img src="/relay.jpg" alt="Relay Module" className="component-image"/>
            <p>4-Channel Relay Module</p>
          </div>
          <div className="component-item">
            <img src="/pzem004t.jpg" alt="PZEM-004T" className="component-image"/>
            <p>PZEM-004T Energy Meter</p>
          </div>
          <div className="component-item">
            <img src="/GM009605 v4.3 Display.jpeg" alt="GM009605 v4.3 Display" className="component-image"/>
            <p>GM009605 v4.3 LED Display</p>
          </div>
        </div>
      </div>

      {/* Circuit Diagram */}
      <div className="circuit-diagram">
        <h3>Circuit Diagram</h3>
        <img src="circuit-diagram.png" alt="Circuit Diagram" className="circuit-diagram-image"/>
      </div>

      {/* Cost Table */}
      <div className="cost-table">
        <h3>Cost of Components</h3>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Quantity</th>
              <th>Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ESP32</td>
              <td>1</td>
              <td>500</td>
            </tr>
            <tr>
              <td>4-Channel Relay Module</td>
              <td>1</td>
              <td>300</td>
            </tr>
            <tr>
              <td>PZEM-004T Energy Meter</td>
              <td>1</td>
              <td>850</td>
            </tr>
            <tr>
              <td>GM009605 v4.3 LED Display</td>
              <td>1</td>
              <td>250</td>
            </tr>
            <tr>
              <td>Firebase Subscription (Cloud Database)</td>
              <td>1</td>
              <td>Free Tier</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Introduction;
