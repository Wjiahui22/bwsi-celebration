import React from 'react';

const MemoryWallPage = ({
  memoryWallPassword,
  setMemoryWallPassword,
  isMemoryWallUnlocked,
  setIsMemoryWallUnlocked,
  handleMemoryWallAccess,
  newMemory,
  setNewMemory,
  handlePhotoUpload,
  uploadedPhotos,
  icons
}) => (
  <div className="memory-page">
    <div className="memory-content">
      <h1 className="memory-title">Memory Chip Wall</h1>
      {!isMemoryWallUnlocked ? (
        <div className="memory-lock">
          <span className="lock-icon">{icons.lock}</span>
          <h2 className="lock-title">Secure Access</h2>
          <p className="lock-text">Enter password to view chip memories</p>
          <div className="lock-form">
            <input
              type="password"
              value={memoryWallPassword}
              onChange={(e) => setMemoryWallPassword(e.target.value)}
              placeholder="Enter password"
              className="lock-input"
            />
            <button onClick={handleMemoryWallAccess} className="lock-button">Unlock Memory</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="memory-upload">
            <h3 className="upload-title">Upload Chip Memory</h3>
            <div className="upload-fields">
              <div>
                <label className="field-label">Date</label>
                <input
                  type="date"
                  value={newMemory.date}
                  onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                  className="field-input"
                />
              </div>
              <div>
                <label className="field-label">Team</label>
                <select
                  value={newMemory.team}
                  onChange={(e) => setNewMemory({ ...newMemory, team: e.target.value })}
                  className="field-input"
                >
                  {['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7'].map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
              <div className="field-full">
                <label className="field-label">Description</label>
                <input
                  type="text"
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                  placeholder="Describe this chip memory..."
                  className="field-input"
                />
              </div>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="file-input"
            />
          </div>
          <div className="photo-grid">
            {uploadedPhotos.map(photo => (
              <div key={photo.id} className="photo-card">
                <div className="photo-image">
                  <img src={photo.url} alt={photo.name} className="photo-img" />
                </div>
                <div className="photo-info">
                  <span className={`photo-team ${photo.team === 'Team 1' ? 'team-blue' : photo.team === 'Team 2' ? 'team-gold' : 'team-default'}`}>
                    {photo.team}
                  </span>
                  <p className="photo-desc">{photo.description}</p>
                  <p className="photo-date">{photo.date}</p>
                </div>
              </div>
            ))}
            {uploadedPhotos.length === 0 && (
              <div className="photo-empty">
                <span className="empty-icon">{icons.camera}</span>
                <p className="empty-text">No chip memories uploaded yet. Share your designs!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default MemoryWallPage;