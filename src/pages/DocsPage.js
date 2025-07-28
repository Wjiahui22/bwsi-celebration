import React from 'react';

const DocsPage = ({ selectedTeamDocs, setSelectedTeamDocs, teams, icons }) => (
  <div className="docs-page">
    <div className="docs-content">
      <h1 className="docs-title">Chip Documentation Hub</h1>
      <div className="docs-select">
        <h3 className="select-title">Select Team</h3>
        <div className="team-buttons">
          {teams.map((team, idx) => (
            <button
              key={team}
              onClick={() => setSelectedTeamDocs(team)}
              className={selectedTeamDocs === team ? `team-button active ${['team-blue', 'team-gold', 'team-dark-blue', 'team-light-gold', 'team-blue', 'team-gold', 'team-dark-blue'][idx]}` : 'team-button'}
            >
              {team}
            </button>
          ))}
        </div>
      </div>
      <div className="docs-sections">
        <div className="doc-section">
          <span className="doc-icon">{icons.file}</span>
          <h3 className="doc-title">Circuit Schematics</h3>
          <p className="doc-text">Upload schematics for {selectedTeamDocs}</p>
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" id={`writeups-${selectedTeamDocs}`} />
          <label htmlFor={`writeups-${selectedTeamDocs}`} className="doc-upload">Upload Files</label>
        </div>
        <div className="doc-section">
          <span className="doc-icon">{icons.file}</span>
          <h3 className="doc-title">Presentation Slides</h3>
          <p className="doc-text">Share slides for {selectedTeamDocs}</p>
          <input type="file" accept=".ppt,.pptx,.pdf" className="hidden" id={`slides-${selectedTeamDocs}`} />
          <label htmlFor={`slides-${selectedTeamDocs}`} className="doc-upload">Upload Slides</label>
        </div>
        <div className="doc-section">
          <span className="doc-icon">{icons.upload}</span>
          <h3 className="doc-title">Demo Videos</h3>
          <p className="doc-text">Upload demo videos for {selectedTeamDocs}</p>
          <input type="file" accept="video/*" className="hidden" id={`videos-${selectedTeamDocs}`} />
          <label htmlFor={`videos-${selectedTeamDocs}`} className="doc-upload">Upload Videos</label>
        </div>
      </div>
      <div className="docs-recent">
        <h3 className="recent-title">Recent Uploads - {selectedTeamDocs}</h3>
        <div className="recent-empty">
          <span className="empty-icon">{icons.file}</span>
          <p className="empty-text">No documents uploaded yet for {selectedTeamDocs}</p>
        </div>
      </div>
    </div>
  </div>
);

export default DocsPage;