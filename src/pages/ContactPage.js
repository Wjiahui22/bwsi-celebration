import React from 'react';

const ContactPage = ({ contactForm, setContactForm, handleContactSubmit, contactMessage, icons }) => {
  const tas = [
    { name: 'Carlos', email: 'carlos.longoria.116@gmail.com', linkedin: 'https://www.linkedin.com/in/carlos-g-longoria/', image: '/images/carlos.jpeg' },
    { name: 'Winnie', email: 'jhwinniec@u.northwestern.edu', linkedin: 'https://www.linkedin.com/in/jhwinniec/', image: '/images/winnie.png' },
    { name: 'Joshua', email: 'joshuazhang101@gmail.com', linkedin: 'https://www.linkedin.com/in/jzhang101/', image: '/images/josh.jpeg' },
    { name: 'Chakri', email: 'pemmasan@msu.edu', linkedin: 'https://www.linkedin.com/in/chakradhara/', image: '/images/chakri.jpeg' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

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
    }
    .contact-content {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 1rem;
    }
    .contact-title {
      font-size: 3rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 2rem;
      background: linear-gradient(to right, #404040, #facc15);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .contact-sections {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .contact-sections {
        grid-template-columns: 1fr 1fr;
      }
    }
    .contact-form {
      background: #1a1a1a;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      padding: 2rem;
      border-left: 4px solid #404040;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .contact-form div {
      display: flex;
      flex-direction: column;
    }
    .contact-form .form-fields {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .contact-form .field-label {
      color: #d4d4d8;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .contact-form .field-input {
      background: #333;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem;
      color: #d4d4d8;
      margin-top: 0.5rem;
    }
    .contact-form .field-input::placeholder {
      color: #9ca3af;
    }
    .contact-form .field-input:focus {
      outline: none;
      box-shadow: 0 0 0 2px #facc15;
    }
    .contact-form .form-button {
      background: #facc15;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      color: #1a1a1a;
      font-weight: bold;
      cursor: pointer;
      align-self: flex-start;
      transition: background-color 0.2s;
    }
    .contact-form .form-button:hover {
      background: #eab308;
    }
    .contact-tas {
      background: #1a1a1a;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      padding: 2rem;
      border-left: 4px solid #facc15;
    }
    .form-title {
      color: #d4d4d8;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .ta-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .ta-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #2a2a2a;
      border-radius: 0.75rem;
      border: 1px solid #404040;
    }
    .ta-photo {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
    }
    .ta-info {
      flex: 1;
    }
    .ta-name {
      color: #d4d4d8;
      font-weight: bold;
      font-size: 1.125rem;
      margin: 0 0 0.5rem 0;
    }
    .ta-role {
      color: #9ca3af;
      font-size: 0.875rem;
      margin: 0 0 0.5rem 0;
    }
    .ta-email {
      color: #facc15;
      font-size: 0.875rem;
      margin: 0 0 0.5rem 0;
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
    .contact-message {
      margin-top: 1rem;
      text-align: center;
      font-size: 1rem;
    }
    .contact-message.success {
      color: #22c55e;
    }
    .contact-message.error {
      color: #ef4444;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="contact-page">
        <div className="contact-content">
          <h1 className="contact-title">{icons?.contact || '📞'} Contact TAs</h1>
          <div className="contact-sections">
            <div className="contact-form">
              <h3 className="form-title">Send a Message</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleContactSubmit();
                }}
                className="form-fields"
              >
                <div>
                  <label className="field-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="field-input"
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="field-input"
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Select Mentor</label>
                  <select
                    name="ta"
                    value={contactForm.ta}
                    onChange={handleInputChange}
                    className="field-input"
                    required
                  >
                    {tas.map(ta => (
                      <option key={ta.name} value={ta.name}>{ta.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    rows={5}
                    className="field-input"
                    required
                  />
                </div>
                <button type="submit" className="form-button">Send Message</button>
              </form>
              {contactMessage && (
                <p
                  className={`contact-message ${contactMessage.includes('Error') ? 'error' : 'success'}`}
                >
                  {contactMessage}
                </p>
              )}
            </div>
            <div className="contact-tas">
              <h3 className="form-title">Teaching Assistants</h3>
              <div className="ta-list">
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
      </div>
    </>
  );
};

export default ContactPage;
