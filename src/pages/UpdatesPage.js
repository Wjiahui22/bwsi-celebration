import React from 'react';

const UpdatesPage = ({ updateLogs, newUpdate, setNewUpdate, addUpdateLog, teams, icons }) => (
  <div className="updates-page">
    <div className="updates-content">
      <h1 className="updates-title">Project Update Log</h1>
      <div className="updates-form">
        <h3 className="form-title">Add New Update</h3>
        <div className="form-fields">
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
              placeholder="Your name"
              className="field-input"
            />
          </div>
          <div>
            <label className="field-label">Action</label>
            <button onClick={addUpdateLog} className="form-button">Add Update</button>
          </div>
        </div>
        <div>
          <label className="field-label">Update Description</label>
          <textarea
            value={newUpdate.update}
            onChange={(e) => setNewUpdate({ ...newUpdate, update: e.target.value })}
            placeholder="Describe your chip update..."
            rows={3}
            className="field-input"
          />
        </div>
      </div>
      <div className="updates-log">
        {updateLogs.map((log) => (
          <div key={log.id} className="log-entry">
            <div className="log-header">
              <div className="log-info">
                <div className={`log-circle ${log.team === 'Team 1' ? 'log-blue' : log.team === 'Team 2' ? 'log-gold' : 'log-default'}`}></div>
                <div>
                  <span className="log-team">{log.team}</span>
                  <p className="log-author">by {log.author}</p>
                </div>
              </div>
              <span className="log-date">{log.date}</span>
            </div>
            <p className="log-text">{log.update}</p>
          </div>
        ))}
        {updateLogs.length === 0 && (
          <div className="log-empty">
            <span className="empty-icon">{icons.clock}</span>
            <p className="empty-text">No updates yet. Teams can log chip progress!</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default UpdatesPage;