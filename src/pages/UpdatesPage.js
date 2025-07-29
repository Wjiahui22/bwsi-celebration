import React from 'react';

const UpdatesPage = ({ updateLogs, newUpdate, setNewUpdate, addUpdateLog, teams, icons }) => (
  <div className="memory-page">
    <div className="memory-content">
      <h1 className="memory-title"> Personal Life Updates</h1>
      <div className="memory-upload" style={{ marginBottom: '2rem' }}>
        <h3 className="upload-title">Log a life Update</h3>
        <div className="upload-fields">
          <div>
            <label className="field-label">Date</label>
            <input
              type="date"
              value={newUpdate.date}
              onChange={(e) => setNewUpdate({ ...newUpdate, date: e.target.value })}
              className="field-input"
            />
          </div>
          <div>
            <label className="field-label">Team</label>
            <select
              value={newUpdate.team}
              onChange={(e) => setNewUpdate({ ...newUpdate, team: e.target.value })}
              className="field-input"
            >
              {teams.map(team => <option key={team} value={team}>{team}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Author</label>
            <input
              type="text"
              value={newUpdate.author}
              onChange={(e) => setNewUpdate({ ...newUpdate, author: e.target.value })}
              placeholder="Enter your name"
              className="field-input"
            />
          </div>
          <div className="field-full">
            <label className="field-label">Update Description</label>
            <input
              type="text"
              value={newUpdate.update}
              onChange={(e) => setNewUpdate({ ...newUpdate, update: e.target.value })}
              placeholder="Describe your chip update..."
              className="field-input"
            />
          </div>
        </div>
        <button onClick={addUpdateLog} className="lock-button" style={{ marginTop: '1rem' }}>
          Add Update
        </button>
      </div>
      <div className="photo-grid">
        {updateLogs.map((log) => (
          <div key={log.id} className="photo-card">
            <div className="photo-info">
              <span className={`photo-team ${
                log.team === 'Team 1' ? 'team-blue' :
                log.team === 'Team 2' ? 'team-gold' : 'team-default'
              }`}>
                {log.team}
              </span>
              <p className="photo-desc">{log.update}</p>
              <p className="photo-author">By {log.author}</p>
              <p className="photo-date">{log.date}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UpdatesPage;