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
        shortDescription: 'Stasis, the ideal habitat monitor, aims to make pet-owning easy and convenient. It is an all-in-one system, with features where several conditions like temperature and humidity will be displayed and be able to be viewed on both a touchscreen LCD and a website, a food dispenser, a locking-mechanism along with a security card-swipe system.',
        website: 'https://www.google.com/',
        category: 'home',
        votes: 0,
        tags: ['Automated pet system', 'Habitat monitor', 'pet care'],
        teamMembers: ['Jina', 'Conan', 'Arya', 'Zimeng', 'Horton'],
        documents: []
      }]
    },
    'Beaver Fever': {
      submissions: [{
        id: 'beaver-fever-1',
        team: 'Beaver Fever',
        projectTitle: 'Beaver Fever',
        shortDescription: 'ESP32 device that tracks gyroscopes movements and uses AI to analyze and output feedback. Website goes along with the project as the main display for 3d model, workout & mood tracking, and ai feedback.',
        website: 'https://www.google.com/',
        category: 'accessibility',
        votes: 0,
        tags: ['Accessibility', 'Healthcare', 'Physical Wellness'],
        teamMembers: ['Abigail', 'Chris', 'Ethan', 'Vihan', 'Jessica'],
        documents: []
      }]
    },
    'Monsieur Tortue': {
      submissions: [{
        id: 'monsieur-tortue-1',
        team: 'Monsieur Tortue',
        projectTitle: 'Monsieur Tortue',
        shortDescription: 'Zandwaker is a cost-effective, autonomous robotic cleaner engineered to identify and collect trash in beach environments. It operates in two modes: fully autonomous and semi-autonomous. In autonomous mode, Zandwaker utilizes a custom onboard lightweight object detection model to identify and remove debris without human input. In semi-autonomous mode, it streams its camera feed to a connected smartphone or laptop, enabling the use of more robust detection models and allowing for real-time user supervision and control.',
        website: 'https://www.google.com/',
        category: 'sustainability',
        votes: 0,
        tags: ['Environment', 'Robotics', 'Sustainability', 'Tortue'],
        teamMembers: ['Cody', 'Florence', 'Jonathan', 'Nishka', 'David'],
        documents: []
      }]
    },
    'Smart Garden': {
      submissions: [{
        id: 'smart-garden-1',
        team: 'Smart Garden',
        projectTitle: 'Smart Garden',
        shortDescription: 'Our Smart Farming system, Smart Garden, combines affordable sensors powered by an Arduino with an easy-to-use Flask website and LED touch screen to offer growers plant-specific live insights on how to improve their plants’ health and growing conditions. This system displays multiple key aspects of a plant’s environment, such as temperature, humidity, soil moisture, and light, along with suggestions to improve these aspects if needed for the plant type. Users can also digitally control irrigation through a smart water pump if soil moisture dips below an ideal level.',
        website: 'https://www.google.com/',
        category: 'agriculture',
        votes: 0,
        tags: ['Agriculture', 'Technology', 'Automation'],
        teamMembers: ['Belal', 'Adrian', 'Maurischa', 'Sahana', 'Robert'],
        documents: []
      }]
    },
    'Handl': {
      submissions: [{
        id: 'handl-1',
        team: 'Handl',
        projectTitle: 'Handl',
        shortDescription: 'Our product is Handl, a sensor-enabled white cane which utilizes an ultrasonic sensor to detect obstacles and alert the user through haptic and auditory feedback.',
        website: 'https://www.google.com/',
        category: 'accessibility',
        votes: 0,
        tags: ['Accessibility', 'Mobility', 'Perception'],
        teamMembers: ['Bailey', 'Jazmine', 'Sujitha', 'Kazimir', 'Sophia'],
        documents: [{
            name: 'Handl Documentation - Team 5',
            url: '/pdfs/Handl.pdf'
          }]
      }]
    },
    'PillMate': {
      submissions: [{
        id: 'pillmate-1',
        team: 'PillMate',
        projectTitle: 'PillMate',
        shortDescription: 'Pill Mate is a user oriented smart pill dispenser that eliminates the dangers of missed medication and double dosing for you, your family, or your patients. Separately managing up to 6 pills through our web interface, you can easily set schedules and notifications for all of your needs. Our closed loop IRIS dispensing technology coupled with secure device-wide password protection ensures that no pill is left unaccounted for.',
        website: 'https://pillmate-7bc72.firebaseapp.com/',
        category: 'healthcare',
        votes: 0,
        tags: ['Healthcare', 'Medication', 'Smart Home'],
        teamMembers: ['Navneet', 'Rohan', 'Pratham', 'Juanito'],
        documents: []
      }]
    },
    'UNC': {
      submissions: [{
        id: 'unc-1',
        team: 'UNC',
        projectTitle: 'UNC',
        shortDescription: 'The device connects the ESP32-CAM, Arduino Uno, and SPI ST7796 touchscreen display, along with 3D printed parts, to create a multifunctional product. The product has three functions: daily motivation displayed via wifi, a pill dispenser, and a calendar for the event you have on a given day. It is aimed toward the elderly and acts as a supplement to home health aid.',
        website: 'https://unc-bwsi.web.app/',
        category: 'wellness',
        votes: 0,
        tags: ['Healthcare', 'Volunteer', 'Interactive'],
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

  const fetchUpdates = async () => {
    const { data, error } = await supabase
      .from('updates')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Failed to fetch updates:', error);
    } else {
      setUpdateLogs(data);
    }
  };

  // Always fetch updates
  fetchUpdates();

  // Fetch photos only if unlocked
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
