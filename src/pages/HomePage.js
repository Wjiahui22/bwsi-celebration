import React from 'react';

const HomePage = () => (
  <div className="home-page">
    <div className="home-content">
      <div className="home-header">
        <h1 className="home-title">Welcome to <span className="highlight">BWSI 2025</span></h1>
        <h2 className="home-subtitle">Microelectronics</h2>
        <div className="divider"></div>
      </div>
      <div className="photo-section">
        <div className="photo-placeholder-home">
          <img
            src="/images/BW-Entrance.jpg"
            alt="Microchip Design"
            className="photo-img"
          />
        </div>
      </div>
      <div className="home-sections">
        <div className="section about">
          <h3 className="section-title">About Our Class</h3>
          <p className="section-text">
            Dive into the Beaver Works Summer Institute 2025 Microelectronics Class!
            This summer, we started with an introduction to Arduino, resistors, and basic electronics.
            Students are now working on hands-on challenges and preparing for their final project!
          </p>
        </div>
        <div className="section highlights">
          <h3 className="section-title">Program Highlights</h3>
          <ul className="highlight-list">
            {[
              'MIT.nano Lab Tour',
              'Circuit Design',
              'Speaker from Waymo',
              'Team-Based Projects'
            ].map((item, idx) => (
              <li key={idx} className="highlight-item">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;