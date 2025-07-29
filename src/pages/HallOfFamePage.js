import React from 'react';

const HallOfFamePage = ({ teamAchievements, icons }) => (
  <div className="hall-page">
    <div className="hall-content">
      <h1 className="hall-title">Hall of Fame</h1>
      <div className="hall-grid">
        {teamAchievements.map((achievement, idx) => (
          <div key={`${achievement.team}-${idx}`} className="hall-card">
            <div className="hall-top">
              <h3 className="hall-team">{achievement.team}</h3>
              <span className="hall-icon">{icons.trophy}</span>
            </div>
            <p className="hall-achievement">{achievement.achievement}</p>
            <div className={`hall-divider ${achievement.color}`}></div>

            {/* 👇 Standalone team member box section */}
            <div className="team-member-section">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="member-box">
                  <div className="photo-placeholder">📷</div>
                  <input
                    type="text"
                    className="member-name-input"
                    placeholder={`Member ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HallOfFamePage;
