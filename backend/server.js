require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:3000",                  // Allow your local computer
    "https://personal-portfolio-website-bgpb.onrender.com"     // Allow your live website
  ],
  credentials: true
}));

app.use(express.json());

// 1. Setup Nodemailer Transporter
// server.js

// ... imports

// 1. Setup Nodemailer Transporter (UPDATED)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com', // Explicitly define the host
  port: 587,              // CHANGE: Use 587 instead of 465
  secure: false,          // CHANGE: Must be false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false, 
  },
  // Keep these timeout settings, they are good practice
  connectionTimeout: 10000, 
  greetingTimeout: 5000,
  socketTimeout: 10000 
});

// ... rest of your code

// Verify connection
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

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    replyTo: email,              
    to: process.env.EMAIL_USER,   
    subject: `Portfolio Contact from ${name}`,
    text: `You have a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    // LOG THE ACTUAL ERROR so you can see it in Render Dashboard
    console.error('Error sending email:', error); 
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});