import React, { useState } from 'react';

const Contact = () => {
  // Simple form state for demonstration (no backend)
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the form data to a backend or email service
  };

  return (
    <section className="contact-section" style={{
      maxWidth: 600,
      margin: '2rem auto',
      background: 'rgba(30,30,30,0.85)',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      padding: '2.5rem 2rem'
    }}>
      <h2 style={{ color: '#ff4b4b', marginBottom: '1.5rem' }}>Contact Me</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '1.5rem 1rem',
          marginBottom: '1rem'
        }}>
          <p style={{ marginBottom: 8 }}>
            <strong>Email:</strong> <a href="mailto:arna532004@gmail.com" style={{ color: '#ff4b4b' }}>arna532004@gmail.com</a>
          </p>
          <p style={{ marginBottom: 8 }}>
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/arna-chaulia-a6917626a/" target="_blank" rel="noreferrer" style={{ color: '#ff4b4b' }}>https://www.linkedin.com/in/arna-chaulia-a6917626a/</a>
          </p>
          <p>
            <strong>GitHub:</strong> <a href="https://github.com/Arna004" target="_blank" rel="noreferrer" style={{ color: '#ff4b4b' }}>https://github.com/Arna004</a>
          </p>
        </div>
        <div>
          <h3 style={{ marginBottom: 12 }}>Send a Message</h3>
          {submitted ? (
            <div style={{ color: '#4caf50', margin: '1rem 0' }}>
              Thank you for reaching out! I'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  padding: '0.7rem',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: '1rem'
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  padding: '0.7rem',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: '1rem'
                }}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                style={{
                  padding: '0.7rem',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: '1rem'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: '#ff4b4b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
