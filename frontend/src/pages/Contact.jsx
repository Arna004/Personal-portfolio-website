import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    console.log('--- Starting Form Submission ---');

    try {
      // 1. Create a timeout controller to abort request if it takes too long (e.g., 60 seconds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); 

      // 2. Send data to your backend
      const response = await fetch('https://personal-portfolio-website-mv0a.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        signal: controller.signal, // Attach the signal
      });

      // Clear the timeout since the response came back
      clearTimeout(timeoutId);

      console.log('Response Status:', response.status);

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' }); // Clear form
        console.log('Success: Message sent.');
      } else {
        setStatus('error');
        console.error('Server Error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      
      // Check if it was a timeout
      if (error.name === 'AbortError') {
        alert("The server took too long to respond. It might be waking up. Please try again in a minute.");
      }
      
      setStatus('error');
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
          
          {/* Success Message */}
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
              
              {/* Error Message */}
              {status === 'error' && (
                <div style={{ color: '#ff4b4b', fontSize: '0.9rem' }}>
                  Something went wrong. Check the console (F12) for details.
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