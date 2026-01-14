require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. CRITICAL: Self-Diagnosis Check ---
// This will print to your Render logs if variables are missing
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("__________________________________________________________");
  console.error("🔴 CRITICAL ERROR: Environment Variables are missing!");
  console.error("   Render cannot see your .env file.");
  console.error("   You MUST go to Render Dashboard -> Environment Tab");
  console.error("   and add 'EMAIL_USER' and 'EMAIL_PASS'.");
  console.error("__________________________________________________________");
} else {
  console.log("✅ Environment Variables detected. Email User:", process.env.EMAIL_USER);
}

// --- 2. Robust CORS Setup ---
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", 
  "https://personal-portfolio-website-frrf.onrender.com" // Your specific live site
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // Allow it anyway for simple troubleshooting, but log it
      console.log("⚠️ Warning: Request from blocked origin:", origin);
      // For strict security, uncomment the next line:
      // return callback(new Error('CORS Policy Error'), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// --- 3. Nodemailer (Cloud-Optimized) ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com', 
  port: 587,              // 587 is the standard for cloud servers
  secure: false,          // False for 587 (uses StartTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false, // Helps avoid 'self-signed certificate' errors
  },
  family: 4,
  connectionTimeout: 10000, 
  greetingTimeout: 5000 
});

// Verify connection
transporter.verify(function (error, success) {
  if (error) {
    console.error('🔴 Transporter Error:', error);
  } else {
    console.log("✅ Server is ready to take messages");
  }
});

app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Debugging log
  console.log(`📩 Attempting to send email from ${name} (${email})`);

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    replyTo: email,              
    to: process.env.EMAIL_USER,   
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error); 
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});