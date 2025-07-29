import React, { useState } from 'react';
import './styles.css';
import HomePage from './pages/HomePage';
import MemoryWallPage from './pages/MemoryWallPage';
import ProjectsPage from './pages/ProjectsPage';
import DocsPage from './pages/DocsPage';
import UpdatesPage from './pages/UpdatesPage';
import ContactPage from './pages/ContactPage';
import HallOfFamePage from './pages/HallOfFamePage';

const MicroelectronicsWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [memoryWallPassword, setMemoryWallPassword] = useState('');
  const [isMemoryWallUnlocked, setIsMemoryWallUnlocked] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedTeamDocs, setSelectedTeamDocs] = useState('Team 1');
  const [teamProjects, setTeamProjects] = useState({
    'Team 1': { url: '', title: '', description: '' },
    'Team 2': { url: '', title: '', description: '' },
    'Team 3': { url: '', title: '', description: '' },
    'Team 4': { url: '', title: '', description: '' },
    'Team 5': { url: '', title: '', description: '' },
    'Team 6': { url: '', title: '', description: '' },
    'Team 7': { url: '', title: '', description: '' }
  });
  const [updateLogs, setUpdateLogs] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', ta: 'Carlos' });
  const [newMemory, setNewMemory] = useState({
    date: '',
    team: 'Team 1',
    description: '',
    files: []
  });
  const [newUpdate, setNewUpdate] = useState({ team: 'Team 1', update: '', author: '' });

  const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7'];

  const teamAchievements = [
    { team: 'Team 1', achievement: 'Best Circuit Design', color: 'blue-gold-gradient' },
    { team: 'Team 2', achievement: 'Top Fabrication Skill', color: 'gold-blue-gradient' },
    { team: 'Team 3', achievement: 'Innovative Chip Layout', color: 'blue-gold-gradient' },
    { team: 'Team 4', achievement: 'Best Signal Processing', color: 'gold-blue-gradient' },
    { team: 'Team 5', achievement: 'Outstanding PCB Design', color: 'blue-gold-gradient' },
    { team: 'Team 6', achievement: 'Top Microcontroller Use', color: 'gold-blue-gradient' },
    { team: 'Team 7', achievement: 'Best Power Efficiency', color: 'blue-gold-gradient' }
  ];

  const handleMemoryWallAccess = () => {
    if (memoryWallPassword === 'bwsi2025') {
      setIsMemoryWallUnlocked(true);
    } else {
      alert('Incorrect password! Hint: bwsi + year');
    }
  };

  const handlePhotoUpload = (e) => {
    setNewMemory({ ...newMemory, files: Array.from(e.target.files) });
  };

  const handleProjectUpdate = (team, field, value) => {
    setTeamProjects(prev => ({
      ...prev,
      [team]: { ...prev[team], [field]: value }
    }));
  };

  const addUpdateLog = () => {
    if (newUpdate.team && newUpdate.update && newUpdate.author) {
      const log = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        team: newUpdate.team,
        update: newUpdate.update,
        author: newUpdate.author
      };
      setUpdateLogs(prev => [log, ...prev]);
      setNewUpdate({ team: 'Team 1', update: '', author: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      alert(`Message sent to ${contactForm.ta}! They will get back to you soon.`);
      setContactForm({ name: '', email: '', message: '', ta: 'Carlos' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleMemorySubmit = () => {
    if (!newMemory.date || !newMemory.team || !newMemory.description || newMemory.files.length === 0) {
      alert('Please fill in all fields and select at least one photo.');
      return;
    }

    const newPhotos = newMemory.files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
      team: newMemory.team,
      description: newMemory.description,
      date: newMemory.date
    }));

    setUploadedPhotos(prev => [...prev, ...newPhotos]);
    setNewMemory({ date: '', team: 'Team 1', description: '', files: [] });
  };

  const handlePhotoDelete = (id) => {
    setUploadedPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const icons = {
    home: '⚙️',
    memory: '💾',
    projects: '🔌',
    docs: '📟',
    updates: '🕒',
    contact: '📞',
    hall: '🏅',
    lock: '🔒',
    camera: '📸',
    user: '👤',
    calendar: '📅',
    edit: '✏️',
    linkedin: '🔗',
    trophy: '🏅',
    file: '📄',
    upload: '📤',
    team: '👥',
    clock: '🕒'
  };

  const Navigation = () => (
  <nav className="nav-bar">
    <div className="nav-content">
      <div className="nav-logo">
        <div className="logo-circuit"></div>
        <h1 className="nav-title">BWSI 2025 Microelectronics</h1>
      </div>
      <div className="nav-dropdown">
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(e.target.value)}
          className="nav-select"
        >
          <option value="home">Home</option>
          <option value="memory">Memory Wall</option>
          <option value="projects">Projects</option>
          <option value="docs">Docs</option>
          <option value="updates">Updates</option>
          <option value="contact">Contact</option>
          <option value="hall">Hall of Fame</option>
        </select>
      </div>
    </div>
  </nav>
);

  return (
    <div className="app-container">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'memory' && (
        <MemoryWallPage
          memoryWallPassword={memoryWallPassword}
          setMemoryWallPassword={setMemoryWallPassword}
          isMemoryWallUnlocked={isMemoryWallUnlocked}
          setIsMemoryWallUnlocked={setIsMemoryWallUnlocked}
          handleMemoryWallAccess={handleMemoryWallAccess}
          newMemory={newMemory}
          setNewMemory={setNewMemory}
          handlePhotoUpload={handlePhotoUpload}
          uploadedPhotos={uploadedPhotos}
          handleMemorySubmit={handleMemorySubmit}
          handlePhotoDelete={handlePhotoDelete}
          icons={icons}
        />
      )}
      {currentPage === 'projects' && (
        <ProjectsPage
          teamProjects={teamProjects}
          handleProjectUpdate={handleProjectUpdate}
          teams={teams}
          icons={icons}
        />
      )}
      {currentPage === 'docs' && (
        <DocsPage
          selectedTeamDocs={selectedTeamDocs}
          setSelectedTeamDocs={setSelectedTeamDocs}
          teams={teams}
          icons={icons}
        />
      )}
      {currentPage === 'updates' && (
        <UpdatesPage
          updateLogs={updateLogs}
          newUpdate={newUpdate}
          setNewUpdate={setNewUpdate}
          addUpdateLog={addUpdateLog}
          teams={teams}
          icons={icons}
        />
      )}
      {currentPage === 'contact' && (
        <ContactPage
          contactForm={contactForm}
          setContactForm={setContactForm}
          handleContactSubmit={handleContactSubmit}
          icons={icons}
        />
      )}
      {currentPage === 'hall' && <HallOfFamePage teamAchievements={teamAchievements} icons={icons} />}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 BWSI Microelectronics. All rights reserved.</p>
          <p className="footer-subtext">Built with ❤️ by your lovely TAs Powered by Silicon & Teamwork</p>
        </div>
      </footer>
    </div>
  );
};

export default MicroelectronicsWebsite;