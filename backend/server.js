require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// REPLACE THIS:
// app.use(cors());

// WITH THIS:
app.use(cors({
  origin: '*', // Allow requests from ANYWHERE (Easiest for testing)
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

// 1. Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your App Password (not your normal password)
  }
});

app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

// 2. Create the Email Endpoint
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // The sender's email (from the form)
    to: process.env.EMAIL_USER, // Your email (where you want to receive it)
    subject: `Portfolio Contact from ${name}`,
    text: `You have a new message from:
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