import React from 'react';

const ProjectsPage = ({ teamProjects, handleProjectUpdate, teams, icons }) => (
  <div className="projects-page">
    <div className="projects-content">
      <h1 className="projects-title">Microchip Projects</h1>
      <div className="projects-grid">
        {teams.map((team, idx) => (
          <div key={team} className="project-card">
            <div className={`project-header ${['project-blue', 'project-gold', 'project-dark-blue', 'project-light-gold', 'project-blue', 'project-gold', 'project-dark-blue'][idx]}`}></div>
            <div className="project-content">
              <div className="project-top">
                <h3 className="project-name">{team}</h3>
                <div className={`project-number ${['project-blue', 'project-gold', 'project-dark-blue', 'project-light-gold', 'project-blue', 'project-gold', 'project-dark-blue'][idx]}`}>
                  <span>{idx + 1}</span>
                </div>
              </div>
              <div className="project-fields">
                <div>
                  <label className="field-label">Project Title</label>
                  <input
                    type="text"
                    value={teamProjects[team].title}
                    onChange={(e) => handleProjectUpdate(team, 'title', e.target.value)}
                    placeholder="Enter project title"
                    className="field-input"
                  />
                </div>
                <div>
                  <label className="field-label">Description</label>
                  <textarea
                    value={teamProjects[team].description}
                    onChange={(e) => handleProjectUpdate(team, 'description', e.target.value)}
                    placeholder="Describe your chip project..."
                    rows={3}
                    className="field-input"
                  />
                </div>
                <div>
                  <label className="field-label">Website URL</label>
                  <input
                    type="url"
                    value={teamProjects[team].url}
                    onChange={(e) => handleProjectUpdate(team, 'url', e.target.value)}
                    placeholder="https://your-chip-site.com"
                    className="field-input"
                  />
                </div>
                <button
                  onClick={() => teamProjects[team].url && window.open(teamProjects[team].url, '_blank')}
                  disabled={!teamProjects[team].url}
                  className={teamProjects[team].url ? `project-button ${['project-blue', 'project-gold', 'project-dark-blue', 'project-light-gold', 'project-blue', 'project-gold', 'project-dark-blue'][idx]}` : 'project-button disabled'}
                >
                  {teamProjects[team].url ? 'Visit Project' : 'Add URL First'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectsPage;