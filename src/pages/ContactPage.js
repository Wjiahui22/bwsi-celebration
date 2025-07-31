import React from 'react';

const ContactPage = ({ icons }) => {
  const tas = [
    { name: 'Carlos', email: 'carlos.longoria.116@gmail.com', linkedin: 'https://www.linkedin.com/in/carlos-g-longoria/', image: '/images/carlos.jpeg' },
    { name: 'Winnie', email: 'jhwinniec@u.northwestern.edu', linkedin: 'https://www.linkedin.com/in/jhwinniec/', image: '/images/winnie.png' },
    { name: 'Joshua', email: 'joshuazhang101@gmail.com', linkedin: 'https://www.linkedin.com/in/jzhang101/', image: '/images/josh.jpeg' },
    { name: 'Chakri', email: 'pemmasan@msu.edu', linkedin: 'https://www.linkedin.com/in/chakradhara/', image: '/images/chakri.jpeg' }
  ];

  // LinkedIn icon as SVG
  const LinkedInIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ marginRight: '0.5rem' }}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const styles = `
    .contact-page {
      min-height: 100vh;
      background: white;
      padding: 2rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .contact-content {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
    }
    .contact-title {
      font-size: 2.5rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 2.5rem;
      background: linear-gradient(to right, #404040, #facc15);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .ta-section {
      background: #1a1a1a;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      padding: 2rem;
      border-left: 4px solid #facc15;
    }
    .ta-title {
      color: #d4d4d8;
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 2rem;
      text-align: center;
    }
    .ta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .ta-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      background: #2a2a2a;
      border-radius: 0.75rem;
      border: 1px solid #404040;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .ta-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    }
    .ta-photo {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
      border: 2px solid #facc15;
    }
    .ta-info {
      text-align: center;
    }
    .ta-name {
      color: #d4d4d8;
      font-weight: bold;
      font-size: 1.25rem;
      margin: 0 0 0.5rem 0;
    }
    .ta-role {
      color: #9ca3af;
      font-size: 0.875rem;
      margin: 0 0 0.75rem 0;
    }
    .ta-email {
      color: #facc15;
      font-size: 0.875rem;
      margin: 0 0 0.75rem 0;
      word-break: break-all;
    }
    .ta-link {
      display: inline-flex;
      align-items: center;
      color: #60a5fa;
      font-size: 0.875rem;
      text-decoration: none;
      transition: color 0.2s;
    }
    .ta-link:hover {
      color: #3b82f6;
    }
    @media (max-width: 640px) {
      .contact-title {
        font-size: 2rem;
      }
      .ta-title {
        font-size: 1.5rem;
      }
      .ta-grid {
        grid-template-columns: 1fr;
      }
      .ta-item {
        padding: 1rem;
      }
      .ta-photo {
        width: 4rem;
        height: 4rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="contact-page">
        <div className="contact-content">
          <h1 className="contact-title">{icons?.contact || '📞'} Meet Our TAs</h1>
          <div className="ta-section">
            <h3 className="ta-title">Teaching Assistants</h3>
            <div className="ta-grid">
              {tas.map((ta) => (
                <div key={ta.name} className="ta-item">
                  <img
                    src={ta.image}
                    alt={ta.name}
                    className="ta-photo"
                  />
                  <div className="ta-info">
                    <h4 className="ta-name">{ta.name}</h4>
                    <p className="ta-role">Teaching Assistant</p>
                    <p className="ta-email">{ta.email}</p>
                    <a href={ta.linkedin} target="_blank" rel="noopener noreferrer" className="ta-link">
                      <LinkedInIcon />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;