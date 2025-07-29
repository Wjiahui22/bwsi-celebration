import React, { useState } from 'react';
import './styles.css';
import HomePage from './pages/HomePage';
import MemoryWallPage from './pages/MemoryWallPage';
import UpdatesPage from './pages/UpdatesPage';
import ContactPage from './pages/ContactPage';
import HallOfFamePage from './pages/HallOfFamePage';
import Gallery from './pages/Gallery';

const MicroelectronicsWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [memoryWallPassword, setMemoryWallPassword] = useState('');
  const [isMemoryWallUnlocked, setIsMemoryWallUnlocked] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [teamProjects, setTeamProjects] = useState({
    'Team 1': {
      submissions: [{
        id: 'team-1-1',
        team: 'Team 1',
        projectTitle: 'Homeo',
        shortDescription: 'A chip designed to monitor pet health metrics in real-time.',
        website: 'https://team1-petwellness.com',
        category: 'Health',
        votes: 0,
        tags: ['Health', 'Pet Care', 'Real-time Monitoring'],
        teamMembers: ['Jina', 'Conan', 'Arya', 'Zimeng', 'Horton'],
        documents: []
      }]
    },
    'Team 2': {
      submissions: [{
        id: 'team-2-1',
        team: 'Team 2',
        projectTitle: 'Beaver Fever',
        shortDescription: 'A chip to enhance medical recovery through adaptive therapy.',
        website: 'https://team2-recovery.com',
        category: 'Medical',
        votes: 0,
        tags: ['Medical', 'Recovery', 'Adaptive Therapy'],
        teamMembers: ['Abigail', 'Chris', 'Ethan', 'Vihan', 'Jessica'],
        documents: []
      }]
    },
    'Team 3': {
      submissions: [{
        id: 'team-3-1',
        team: 'Team 3',
        projectTitle: 'Monsieur Tortue',
        shortDescription: 'A chip for real-time multilingual translation.',
        website: 'https://team3-multilingual.com',
        category: 'AI/ML',
        votes: 0,
        tags: ['AI', 'Translation', 'Multilingual'],
        teamMembers: ['Cody', 'Florence', 'Jonathan', 'Nishka', 'David'],
        documents: []
      }]
    },
    'Team 4': {
      submissions: [{
        id: 'team-4-1',
        team: 'Team 4',
        projectTitle: 'Smart Garden',
        shortDescription: 'A chip for optimizing crop growth through environmental sensing.',
        website: 'https://team4-agriculture.com',
        category: 'Agriculture',
        votes: 0,
        tags: ['Agriculture', 'Sensors', 'Environment'],
        teamMembers: ['Belal', 'Adrian', 'Maurischa', 'Sahana', 'Robert'],
        documents: []
      }]
    },
    'Team 5': {
      submissions: [{
        id: 'team-5-1',
        team: 'Team 5',
        projectTitle: 'Handl',
        shortDescription: 'A chip for intelligent handle control in smart devices.',
        website: 'https://team5-smarthandle.com',
        category: 'IoT',
        votes: 0,
        tags: ['IoT', 'Smart Devices', 'Control'],
        teamMembers: ['Bailey', 'Jazmine', 'Sujitha', 'Kazimir', 'Sophia'],
        documents: []
      }]
    },
    'Team 6': {
      submissions: [{
        id: 'team-6-1',
        team: 'Team 6',
        projectTitle: 'PillMate',
        shortDescription: 'A chip for precise medication dispensing in healthcare.',
        website: 'https://team6-pilldispense.com',
        category: 'Health',
        votes: 0,
        tags: ['Health', 'Medication', 'Precision'],
        teamMembers: ['Navneet', 'Rohan', 'Pratham', 'Juanito'],
        documents: []
      }]
    },
    'Team 7': {
      submissions: [{
        id: 'team-7-1',
        team: 'Team 7',
        projectTitle: 'UNC',
        shortDescription: 'A chip for enhanced network security and encryption.',
        website: 'https://team7-networksecurity.com',
        category: 'Security',
        votes: 0,
        tags: ['Security', 'Encryption', 'Network'],
        teamMembers: ['Brandon', 'Zarif', 'Aadrit', 'Robert'],
        documents: []
      }]
    }
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

  const teams = ['Homeo', 'Beaver Fever', 'Monsieur Tortue', 'Smart Garden', 'Handl', 'PillMate', 'UNC'];

  const teamAchievements = [
    {
      team: "Homeo",
      achievement: "Pet Wellness Experts",
      color: "blue-gold-gradient",
      members: ["Jina", "Conan", "Arya", "Zimeng", "Horton"]
    },
    {
      team: "Beaver Fever",
      achievement: "Recovery Innovators",
      color: "gold-blue-gradient",
      members: ["Abigail", "Chris", "Ethan", "Vihan", "Jessica"]
    },
    {
      team: "Monsieur Tortue",
      achievement: "Multilingual Maestros",
      color: "blue-gold-gradient",
      members: ["Cody", "Florence", "Jonathan", "Nishka", "David"]
    },
    {
      team: "Smart Garden",
      achievement: "Greatest Green Thumbs",
      color: "gold-blue-gradient",
      members: ["Belal", "Adrian", "Maurischa", "Sahana", "Robert"]
    },
    {
      team: "Handl",
      achievement: "They Can Handl It",
      color: "blue-gold-gradient",
      members: ["Bailey", "Jazmine", "Sujitha", "Kazimir", "Sophia"]
    },
    {
      team: "PillMate",
      achievement: "Pill Precision Specialists",
      color: "gold-blue-gradient",
      members: ["Navneet", "Rohan", "Pratham", "Juanito"]
    },
    {
      team: "UNC",
      achievement: "Unifying Network Creators",
      color: "blue-gold-gradient",
      members: ["Brandon", "Zarif", "Aadrit", "Robert"]
    },
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

  // Aggregate all submissions for the Gallery
  const allSubmissions = Object.values(teamProjects).flatMap(team => team.submissions);

  const Navigation = () => (
    <nav style={{
      backgroundColor: '#18181b',
      padding: '16px',
      borderBottom: '1px solid #4b5563'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(to right, #facc15, #eab308)',
            borderRadius: '50%'
          }}></div>
          <h1 style={{color: '#facc15', fontSize: '24px', fontWeight: '700'}}>
            BWSI 2025 Microelectronics
          </h1>
        </div>
        <div>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
            style={{
              backgroundColor: '#27272a',
              border: '1px solid #4b5563',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#facc15',
              outline: 'none'
            }}
          >
            <option value="home">Home</option>
            <option value="memory">Memory Wall</option>
            <option value="gallery">Gallery</option>
            <option value="updates">Updates</option>
            <option value="contact">Contact</option>
            <option value="hall">Hall of Fame</option>
          </select>
        </div>
      </div>
    </nav>
  );

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fff'}}>
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
      {currentPage === 'gallery' && (
        <Gallery submissions={allSubmissions} />
      )}
      {currentPage === 'hall' && <HallOfFamePage teamAchievements={teamAchievements} icons={icons} />}
      <footer style={{
        backgroundColor: '#18181b',
        padding: '32px',
        textAlign: 'center',
        borderTop: '1px solid #4b5563'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <p style={{color: '#d1d5db', marginBottom: '8px'}}>
            © 2025 BWSI Microelectronics. All rights reserved.
          </p>
          <p style={{color: '#9ca3af', fontSize: '14px'}}>
            Built with ❤️ by your lovely TAs Powered by Silicon & Teamwork
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MicroelectronicsWebsite;