import supabase from './supabaseClient';
import React, { useState, useEffect } from 'react';
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
  const [newMemory, setNewMemory] = useState({ date: '', description: '', team: 'Homeo', files: [] });
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ team: 'Homeo', update: '', author: '' });
  const [teamProjects] = useState({
    'Homeo': {
      submissions: [{
        id: 'homeo-1',
        team: 'Homeo',
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
    'Beaver Fever': {
      submissions: [{
        id: 'beaver-fever-1',
        team: 'Beaver Fever',
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
    'Monsieur Tortue': {
      submissions: [{
        id: 'monsieur-tortue-1',
        team: 'Monsieur Tortue',
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
    'Smart Garden': {
      submissions: [{
        id: 'smart-garden-1',
        team: 'Smart Garden',
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
    'Handl': {
      submissions: [{
        id: 'handl-1',
        team: 'Handl',
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
    'PillMate': {
      submissions: [{
        id: 'pillmate-1',
        team: 'PillMate',
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
    'UNC': {
      submissions: [{
        id: 'unc-1',
        team: 'UNC',
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
    }
  ];

  const handleMemoryWallAccess = () => {
    if (memoryWallPassword === 'bwsi2025') {
      setIsMemoryWallUnlocked(true);
    } else {
      alert('Incorrect password! Hint: bwsi + year');
    }
  };

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files);

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const newPhoto = {
          url: e.target.result,
          name: file.name,
          date: newMemory.date || null,
          description: newMemory.description,
          team: newMemory.team === 'Team 1' ? 'Homeo' : newMemory.team,
          upload_date: new Date().toISOString().split('T')[0]
        };

        const { error } = await supabase.from('photos').insert([newPhoto]);
        if (error) {
          console.error('Upload error:', error);
        } else {
          setUploadedPhotos(prev => [...prev, newPhoto]);
        }
      };
      reader.readAsDataURL(file);
    }

    setNewMemory({ date: '', description: '', team: 'Homeo', files: [] });
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
      team: newMemory.team === 'Team 1' ? 'Homeo' : newMemory.team,
      description: newMemory.description,
      date: newMemory.date
    }));

    setUploadedPhotos(prev => [...prev, ...newPhotos]);
    setNewMemory({ date: '', team: 'Homeo', description: '', files: [] });
  };

  const addUpdateLog = async () => {
    if (newUpdate.team && newUpdate.update && newUpdate.author) {
      const log = {
        team: newUpdate.team === 'Team 1' ? 'Homeo' : newUpdate.team,
        update: newUpdate.update,
        author: newUpdate.author,
        date: new Date().toISOString().split('T')[0]
      };

      const { error } = await supabase.from('updates').insert([log]);
      if (error) {
        console.error('Error saving update:', error);
      } else {
        setUpdateLogs(prev => [log, ...prev]);
        setNewUpdate({ team: 'Homeo', update: '', author: '' });
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) {
        console.error('Failed to fetch photos:', error);
      } else {
        const updatedPhotos = data.map(photo => ({
          ...photo,
          team: photo.team === 'Team 1' ? 'Homeo' : photo.team
        }));
        setUploadedPhotos(updatedPhotos);
      }
    };

    if (isMemoryWallUnlocked) {
      fetchPhotos();
    }
  }, [isMemoryWallUnlocked]);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(to right, #facc15, #eab308)',
            borderRadius: '50%'
          }}></div>
          <h1 style={{ color: '#facc15', fontSize: '24px', fontWeight: '700' }}>
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
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
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
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: '#d1d5db', marginBottom: '8px' }}>
            © 2025 BWSI Microelectronics. All rights reserved.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Built with ❤️ by your lovely TAs Powered by Silicon & Teamwork
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MicroelectronicsWebsite;