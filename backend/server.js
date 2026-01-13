require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// --- FIX #1: CORS Configuration ---
// Removed 'credentials: true' because it conflicts with origin: '*'
app.use(cors({
  origin: '*', 
  methods: ['POST', 'GET'],
}));

app.use(express.json());

// 1. Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

// Verify connection configuration (Optional but helpful for debugging)
transporter.verify(function (error, success) {
  if (error) {
    console.log('Transporter Error:', error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

// 2. Create the Email Endpoint
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // --- FIX #2: Email Logic ---
  const mailOptions = {
    from: process.env.EMAIL_USER, // MUST be your authenticated email
    replyTo: email,               // The visitor's email goes here
    to: process.env.EMAIL_USER,   // Sending it to yourself
    subject: `Portfolio Contact from ${name}`,
    text: `You have a new message from your portfolio website:
    
    Name: ${name}
    Email: ${email}
    
    Message:
    ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});