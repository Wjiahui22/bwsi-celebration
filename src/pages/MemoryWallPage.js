import React from 'react';

const preventEnterSubmit = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};


const MemoryWallPage = ({
  memoryWallPassword,
  setMemoryWallPassword,
  isMemoryWallUnlocked,
  setIsMemoryWallUnlocked,
  handleMemoryWallAccess,
  newMemory,
  setNewMemory,
  handlePhotoUpload,
  handleMemorySubmit, // 🔹 NEW PROP: Add this to handle submission
  uploadedPhotos,
  handlePhotoDelete, // 🔹 NEW PROP: Add this for delete functionality
  icons
}) => (
  <div className="memory-page">
    <div className="memory-content">
      <h1 className="memory-title">Memory Chip Wall</h1>
      {!isMemoryWallUnlocked ? (
        <div className="memory-lock">
          <span className="lock-icon">{icons.lock}</span>
          <h2 className="lock-title">Secure Access</h2>
          <p className="lock-text">Enter password to view memories</p>
          <div className="lock-form">
            <input
              type="password"
              value={memoryWallPassword}
              onChange={(e) => setMemoryWallPassword(e.target.value)}
              placeholder="Enter password"
              className="lock-input"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleMemoryWallAccess();
                }
              }}
            />
            <button onClick={handleMemoryWallAccess} className="lock-button">Unlock Memories</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="memory-upload">
            <h3 className="upload-title">Upload your favorite BWSI memory</h3>
            <div className="upload-fields"onKeyDown={preventEnterSubmit}>
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
                  {['Homeo', 'Beaver Fever', 'Monsieur Tortue', 'Smart Garden', 'Handl', 'PillMate', 'UNC'].map(team => (
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
                  placeholder="Describe this memory..."
                  className="field-input"
                />
              </div>
              <div className="field-full">
                <label className="field-label">Upload Photos</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="field-input" // ✅ matches the input style
                />
              </div>
            </div>
            <button onClick={handleMemorySubmit} className="lock-button" style={{ marginTop: '1rem' }}>
              Submit Memory
            </button>
          </div>

          <div className="photo-grid">
            {uploadedPhotos.length > 0 ? (
              uploadedPhotos.map(photo => (
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
                    <button
                      className="delete-button"
                      onClick={() => handlePhotoDelete(photo.id)} // 🔸 delete function per photo
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default MemoryWallPage;
