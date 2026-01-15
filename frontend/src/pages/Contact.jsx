import React, { useState } from 'react';
// No need for 'emailjs' import or 'useRef' anymore

const Contact = () => {
  const [form, setForm] = useState({ user_name: '', user_email: '', message: '' });
  const [status, setStatus] = useState('idle');

  // CHANGE THIS: Put your actual Render Backend URL here
  // If you are running locally, use 'http://localhost:5000/contact'
  const BACKEND_URL = "https://personal-portfolio-website-frrf.onrender.com/contact"; 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 1. Send data to YOUR backend, not EmailJS directly
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We map the form data to the names the backend expects (name, email, message)
        body: JSON.stringify({
          name: form.user_name,
          email: form.user_email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Backend Success:', data);
        setStatus('success');
        setForm({ user_name: '', user_email: '', message: '' }); // Clear form
      } else {
        throw new Error(data.error || 'Failed to send message');
      }

    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
      alert(`Failed to send message: ${error.message}`);
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
            // No 'ref' needed anymore
            <form onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                value={form.user_name}
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
                name="user_email"
                placeholder="Your Email"
                value={form.user_email}
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