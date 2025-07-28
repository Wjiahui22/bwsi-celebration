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
        <div className="photo-placeholder">
          <span className="photo-icon">📸</span>
          <p className="photo-text">Chip Photo Coming Soon</p>
          <p className="photo-subtext">Upload your latest microchip design!</p>
        </div>
      </div>
      <div className="home-sections">
        <div className="section about">
          <h3 className="section-title">About Our Class</h3>
          <p className="section-text">
            Dive into the Beaver Works Summer Institute 2025 Microelectronics program! 
            Explore semiconductor physics, circuit design, and fabrication with cutting-edge tools.
          </p>
        </div>
        <div className="section highlights">
          <h3 className="section-title">Program Highlights</h3>
          <ul className="highlight-list">
            {[
              'Semiconductor Fabrication Labs',
              'Advanced Circuit Design',
              'Industry Expert Mentorship',
              'Team-Based Chip Projects'
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