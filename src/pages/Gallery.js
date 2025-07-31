import supabase from '../supabaseClient';
import React, { useState, useEffect } from 'react';

// CSS styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    padding: '16px 0',
  },
  wrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 8px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '12px',
    background: 'linear-gradient(to right, #4b5563, #facc15)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '24px',
  },
  searchFilterBar: {
    backgroundColor: '#18181b',
    borderRadius: '12px',
    padding: '16px',
    borderLeft: '4px solid #facc15',
    marginBottom: '24px',
  },
  searchFilterRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  searchContainer: {
    position: 'relative',
    flex: '1',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 36px',
    backgroundColor: '#27272a',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
  },
  select: {
    backgroundColor: '#27272a',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    padding: '10px 12px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: {
    backgroundColor: '#18181b',
    borderRadius: '8px',
    padding: '16px',
    borderLeft: '4px solid #facc15',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  statLabel: {
    color: '#d1d5db',
    fontSize: '14px',
  },
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  projectCard: {
    backgroundColor: '#18181b',
    borderRadius: '12px',
    padding: '16px',
    borderLeft: '4px solid #facc15',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.2s',
  },
  projectCardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    zIndex: '50',
  },
  modalContent: {
    backgroundColor: '#18181b',
    borderRadius: '12px',
    maxWidth: '90vw',
    width: '100%',
    maxHeight: '85vh',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '16px',
    borderBottom: '1px solid #4b5563',
  },
  modalBody: {
    padding: '16px',
    overflowY: 'auto',
    maxHeight: '60vh',
  },
  modalFooter: {
    padding: '16px',
    borderTop: '1px solid #4b5563',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonPrimary: {
    backgroundColor: '#facc15',
    color: '#18181b',
  },
  buttonVote: {
    backgroundColor: '#2563eb',
    color: '#fff',
  },
  link: {
    color: '#facc15',
    textDecoration: 'underline',
    marginTop: '6px',
    marginBottom: '12px',
    display: 'inline-block',
    fontSize: '14px',
  },
  // Mobile-specific styles
  '@media (max-width: 640px)': {
    container: {
      padding: '8px 0',
    },
    wrapper: {
      padding: '0 4px',
    },
    title: {
      fontSize: '28px',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '14px',
      marginBottom: '16px',
    },
    searchFilterBar: {
      padding: '12px',
    },
    searchFilterRow: {
      flexDirection: 'column',
      gap: '8px',
    },
    statsGrid: {
      gridTemplateColumns: '1fr',
      gap: '12px',
    },
    statCard: {
      padding: '12px',
    },
    statNumber: {
      fontSize: '20px',
    },
    projectGrid: {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
    projectCard: {
      padding: '12px',
    },
    modalContent: {
      maxWidth: '95vw',
      maxHeight: '90vh',
    },
    modalHeader: {
      padding: '12px',
    },
    modalBody: {
      padding: '12px',
    },
    modalFooter: {
      padding: '12px',
    },
  },
};

// Enhanced Gallery with Voting
const EnhancedShowcaseGallery = ({ submissions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filterBy, setFilterBy] = useState('all');
  const [votes, setVotes] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      const { data, error } = await supabase.from('votes').select('*');
      if (data) {
        const voteMap = {};
        data.forEach(row => {
          voteMap[row.project_id] = row.vote_count;
        });
        setVotes(voteMap);
      } else {
        console.error('Failed to fetch votes:', error);
      }
    };

    fetchVotes();
  }, []);

  const enhancedSubmissions = submissions || [];

  const handleVote = async (projectId) => {
    // Optimistically update local state
    setVotes(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1
    }));

    const { data, error } = await supabase.rpc('increment_vote', { p_id: projectId });

    if (error) {
      console.log('RPC result:', { data, error });
      alert('Vote failed. Please try again.');
    }
  };

  const filteredAndSortedSubmissions = enhancedSubmissions
    .filter(sub => {
      const matchesSearch = sub.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = filterBy === 'all' ||
                           (filterBy === sub.category.toLowerCase());

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return (b.votes + (votes[b.id] || 0)) - (a.votes + (votes[a.id] || 0));
        case 'title':
        default:
          return a.team.localeCompare(b.team);
      }
    });

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header with Search and Filters */}
        <div style={styles.header}>
          <h1 style={styles.title}>Design Showcase Gallery</h1>
          <p style={styles.subtitle}>Discover innovative project designs, vote for your favorites, and connect with fellow innovators</p>

          {/* Search and Filter Bar */}
          <div style={styles.searchFilterBar}>
            <div style={styles.searchFilterRow}>
              {/* Search */}
              <div style={styles.searchContainer}>
                <span style={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search teams or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.select}
              >
                <option value="title">Team (A-Z)</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* Filter */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                style={styles.select}
              >
                <option value="all">All Projects</option>
                <option value="health">Health</option>
                <option value="medical">Medical</option>
                <option value="ai/ml">AI/ML</option>
                <option value="agriculture">Agriculture</option>
                <option value="iot">IoT</option>
                <option value="security">Security</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, borderLeftColor: '#facc15'}}>
            <span style={{fontSize: '28px'}}>🏆</span>
            <div style={{...styles.statNumber, color: '#facc15'}}>{enhancedSubmissions.length}</div>
            <div style={styles.statLabel}>Total Projects</div>
          </div>
          <div style={{...styles.statCard, borderLeftColor: '#3b82f6'}}>
            <span style={{fontSize: '28px'}}>👍</span>
            <div style={{...styles.statNumber, color: '#3b82f6'}}>
              {enhancedSubmissions.reduce((acc, sub) => acc + (sub.votes || 0) + (votes[sub.id] || 0), 0)}
            </div>
            <div style={styles.statLabel}>Total Votes</div>
          </div>
        </div>

        {/* Project Grid */}
        {enhancedSubmissions.length === 0 ? (
          <p style={{textAlign: 'center', color: '#9ca3af', fontSize: '14px'}}>No projects submitted yet.</p>
        ) : (
          <div style={styles.projectGrid}>
            {filteredAndSortedSubmissions.map((submission) => (
              <EnhancedProjectCard
                key={submission.id}
                submission={submission}
                votes={votes}
                onVote={handleVote}
                onViewDetails={() => setSelectedProject(submission)}
              />
            ))}
          </div>
        )}

        {/* Enhanced Project Detail Modal */}
        {selectedProject && (
          <EnhancedProjectModal
            submission={selectedProject}
            votes={votes}
            onVote={handleVote}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

// Enhanced Project Card Component
const EnhancedProjectCard = ({ submission, votes, onVote, onViewDetails }) => {
  const totalVotes = (submission.votes || 0) + (votes[submission.id] || 0);

  return (
    <div
      style={styles.projectCard}
      onMouseEnter={e => Object.assign(e.currentTarget.style, styles.projectCardHover)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, styles.projectCard)}
    >
      {/* Header */}
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
        <div>
          <h3 style={{fontSize: '18px', fontWeight: '700', color: '#facc15'}}>{submission.team}</h3>
        </div>
      </div>

      {/* Project Info */}
      <p style={{color: '#d1d5db', fontSize: '14px', marginBottom: '12px'}}>{submission.shortDescription}</p>
      {submission.website && (
        <a href={submission.website} target="_blank" rel="noopener noreferrer" style={styles.link}>
          Visit Project Website
        </a>
      )}

      {/* Tags */}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px'}}>
        {submission.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} style={{backgroundColor: '#27272a', color: '#facc15', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', border: '1px solid #4b5563'}}>
            {tag}
          </span>
        ))}
        {submission.tags.length > 3 && (
          <span style={{color: '#9ca3af', fontSize: '12px'}}>+{submission.tags.length - 3} more</span>
        )}
      </div>

      {/* Stats */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px'}}>
        <div style={{backgroundColor: '#27272a', borderRadius: '6px', padding: '12px', textAlign: 'center', border: '1px solid #4b5563'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'}}>
            <span style={{color: '#3b82f6'}}>👍</span>
            <span style={{color: '#3b82f6', fontWeight: '600', fontSize: '14px'}}>{totalVotes}</span>
          </div>
          <div style={styles.statLabel}>Votes</div>
        </div>
        <div style={{backgroundColor: '#27272a', borderRadius: '6px', padding: '12px', textAlign: 'center', border: '1px solid #4b5563'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'}}>
            <span style={{color: '#a855f7'}}>👥</span>
            <span style={{color: '#a855f7', fontWeight: '600', fontSize: '14px'}}>{submission.teamMembers.length}</span>
          </div>
          <div style={styles.statLabel}>Members</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{display: 'flex', gap: '8px'}}>
        <button
          onClick={onViewDetails}
          style={{...styles.button, ...styles.buttonPrimary, flex: '1', fontSize: '14px'}}
        >
          View Details
        </button>
        <button
          onClick={() => onVote(submission.id)}
          style={{...styles.button, ...styles.buttonVote, display: 'flex', alignItems: 'center', gap: '4px'}}
        >
          👍
        </button>
      </div>
    </div>
  );
};

// Enhanced Project Detail Modal
const EnhancedProjectModal = ({ submission, votes, onVote, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const totalVotes = (submission.votes || 0) + (votes[submission.id] || 0);

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <h2 style={{fontSize: '20px', fontWeight: '700', color: '#facc15'}}>{submission.team}</h2>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af', fontSize: '12px'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  👥 {submission.teamMembers.length} members
                </span>
                <span style={{backgroundColor: '#27272a', padding: '4px 8px', borderRadius: '4px', color: '#facc15', fontSize: '12px'}}>
                  {submission.category}
                </span>
              </div>
              {submission.website && (
                <a href={submission.website} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  Visit Project Website
                </a>
              )}
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#3b82f6'}}>
                  👍 {totalVotes}
                </span>
              </div>
              <button
                onClick={onClose}
                style={{color: '#9ca3af', fontSize: '20px', fontWeight: '700', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                ×
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{display: 'flex', gap: '4px', marginTop: '16px'}}>
            {['overview', 'documentation', 'team'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.button,
                  backgroundColor: activeTab === tab ? '#facc15' : '#27272a',
                  color: activeTab === tab ? '#18181b' : '#d1d5db',
                  textTransform: 'capitalize',
                  fontSize: '14px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={styles.modalBody}>
          {activeTab === 'overview' && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div>
                <h4 style={{fontSize: '16px', fontWeight: '600', color: '#facc15', marginBottom: '8px'}}>Project Description</h4>
                <p style={{color: '#d1d5db', lineHeight: '1.5', fontSize: '14px'}}>{submission.shortDescription}</p>
              </div>

              <div>
                <h4 style={{fontSize: '16px', fontWeight: '600', color: '#facc15', marginBottom: '8px'}}>Tags</h4>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                  {submission.tags.map((tag, idx) => (
                    <span key={idx} style={{backgroundColor: '#27272a', color: '#facc15', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', border: '1px solid #4b5563'}}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documentation' && (
            <div>
              <h4 style={{fontSize: '16px', fontWeight: '600', color: '#facc15', marginBottom: '12px'}}>Documentation</h4>
              {submission.documents && submission.documents.length > 0 ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  {submission.documents.map((doc, idx) => (
                    <div key={idx} style={{backgroundColor: '#27272a', borderRadius: '6px', padding: '12px', border: '1px solid #4b5563'}}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{...styles.link, marginBottom: '0', fontSize: '14px'}}
                      >
                        {doc.name}
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{color: '#9ca3af', fontSize: '14px'}}>No documentation uploaded.</p>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <h4 style={{fontSize: '16px', fontWeight: '600', color: '#facc15', marginBottom: '12px'}}>Team Members</h4>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px'}}>
                {submission.teamMembers.map((member, idx) => (
                  <div key={idx} style={{backgroundColor: '#27272a', borderRadius: '6px', padding: '12px', border: '1px solid #4b5563'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div>
                        <p style={{color: '#fff', fontWeight: '500', fontSize: '14px'}}>{member}</p>
                        <p style={{color: '#9ca3af', fontSize: '12px'}}>Team Member</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={styles.modalFooter}>
          <div style={{display: 'flex', gap: '8px'}}>
            <button
              onClick={() => onVote(submission.id)}
              style={{...styles.button, ...styles.buttonVote, display: 'flex', alignItems: 'center', gap: '6px'}}
            >
              👍 Vote ({totalVotes})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedShowcaseGallery;