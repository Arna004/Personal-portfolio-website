require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. Environment Check ---
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("🔴 CRITICAL: Env vars missing. Check Render Dashboard.");
} else {
  console.log("✅ Env vars detected. User:", process.env.EMAIL_USER);
}

// --- 2. CORS Setup ---
const allowedOrigins = [
  "http://localhost:3000",
  "https://personal-portfolio-website-frrf.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log("⚠️ Blocked Origin:", origin);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// --- 3. Nodemailer (STRICT CONFIGURATION) ---
const transporter = nodemailer.createTransport({
  // service: 'gmail',  <-- REMOVED. This was causing the conflict.
  host: 'smtp.gmail.com', // Manually set host
  port: 587,              // Manually set port
  secure: false,          // False for 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  // NETWORK SETTINGS
  family: 4,              // Force IPv4
  logger: true,           // Log the actual SMTP conversation
  debug: true,            // Show debug info
  connectionTimeout: 30000, // Increased to 30 seconds
  greetingTimeout: 15000,   // Increased to 15 seconds
  socketTimeout: 30000      // Increased to 30 seconds
});

// Verify connection
transporter.verify(function (error, success) {
  if (error) {
    console.error('🔴 Transporter Verification Failed:', error);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});

app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`📩 Processing mail from: ${email}`);

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    replyTo: email,              
    to: process.env.EMAIL_USER,   
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error); 
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});