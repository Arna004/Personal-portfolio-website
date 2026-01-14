import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // 1. Increase timeout to allow Render server to wake up
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 Minutes

    try {
      const BASE_URL = "https://personal-portfolio-website-mv0a.onrender.com"
      const response = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // Clear timeout if response received

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        console.log('Success: Message sent.');
      } else {
        // Handle server errors (like the 500 error)
        setStatus('error');
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert(`Failed to send: ${errorData.details || 'Server error'}`);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      
      if (error.name === 'AbortError') {
        alert("The request timed out. The server might be waking up (Render Free Tier). Please click Send again.");
      } else {
        setStatus('error');
        alert("Network error. Please try again.");
      }
    }
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
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/arna-chaulia-a6917626a/" target="_blank" rel="noreferrer" style={{ color: '#ff4b4b' }}>LinkedIn Profile</a>
          </p>
          <p>
            <strong>GitHub:</strong> <a href="https://github.com/Arna004" target="_blank" rel="noreferrer" style={{ color: '#ff4b4b' }}>GitHub Profile</a>
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: 12 }}>Send a Message</h3>
          
          {status === 'success' ? (
            <div style={{ color: '#4caf50', margin: '1rem 0', fontWeight: 'bold' }}>
              Thank you! Your message has been sent successfully.
              <button 
                onClick={() => setStatus('idle')} 
                style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #4caf50' }}>
                Send another
              </button>
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
                disabled={status === 'submitting'}
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
                disabled={status === 'submitting'}
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
                disabled={status === 'submitting'}
                style={{
                  padding: '0.7rem',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: '1rem'
                }}
              />
              
              {status === 'error' && (
                <div style={{ color: '#ff4b4b', fontSize: '0.9rem' }}>
                  Failed to send message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: status === 'submitting' ? '#ccc' : '#ff4b4b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '1.1rem',
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;