import React from 'react';

const ContactPage = ({ contactForm, setContactForm, handleContactSubmit, tas, icons }) => (
  <div className="contact-page">
    <div className="contact-content">
      <h1 className="contact-title">Contact Circuit Mentors</h1>
      <div className="contact-sections">
        <div className="contact-form">
          <h3 className="form-title">Send a Message</h3>
          <div className="form-fields">
            <div>
              <label className="field-label">Your Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Enter your name"
                className="field-input"
              />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="Enter your email"
                className="field-input"
              />
            </div>
            <div>
              <label className="field-label">Select Mentor</label>
              <select
                value={contactForm.ta}
                onChange={(e) => setContactForm({ ...contactForm, ta: e.target.value })}
                className="field-input"
              >
                {tas.map(ta => <option key={ta.name} value={ta.name}>{ta.name}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Your message..."
                rows={5}
                className="field-input"
              />
            </div>
            <button onClick={handleContactSubmit} className="form-button">Send Message</button>
          </div>
        </div>
        <div className="contact-tas">
          <h3 className="form-title">Circuit Mentors</h3>
          <div className="ta-list">
            {tas.map((ta, idx) => (
              <div key={ta.name} className="ta-item">
                <div className={`ta-chip ${['chip-blue', 'chip-gold', 'chip-dark-blue', 'chip-light-gold'][idx]}`}></div>
                <div>
                  <h4 className="ta-name">{ta.name}</h4>
                  <a href={ta.linkedin} target="_blank" rel="noopener noreferrer" className="ta-link">
                    <span className="link-icon">{icons.linkedin}</span>LinkedIn Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;