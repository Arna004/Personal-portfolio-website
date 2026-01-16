require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. Environment Check ---
const requiredVars = [
  'EMAILJS_SERVICE_ID', 
  'EMAILJS_TEMPLATE_ID', 
  'EMAILJS_PUBLIC_KEY', 
  'EMAILJS_PRIVATE_KEY' // This is the Access Token from EmailJS
];

const missingVars = requiredVars.filter(key => !process.env[key]);

if (missingVars.length > 0) {
  console.error("__________________________________________________________");
  console.error("🔴 CRITICAL: Missing EmailJS Environment Variables:");
  missingVars.forEach(key => console.error(`   - ${key}`));
  console.error("   Please add them to your .env file or Render Dashboard.");
  console.error("__________________________________________________________");
} else {
  console.log("✅ EmailJS Configuration detected.");
}

// --- 2. CORS Setup ---
const allowedOrigins = [
  "https://arna-portfolio-website-4r79.vercel.app/contact",
  "https://personal-portfolio-website-frrf.onrender.com",
  // Add any other domains you deploy your frontend to
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

// --- 3. Routes ---

app.get('/', (req, res) => {
  res.send('Portfolio backend is running (EmailJS Mode)!');
});

app.post('/contact', async (req, res) => {
  // 1. Destructure the data sent from Frontend
  const { name, email, message } = req.body;
  
  console.log(`📩 Processing mail request from: ${email}`);

  if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields (name, email, message) are required." });
  }

  // 2. Prepare the data for EmailJS API
  const emailJsData = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY, // Critical for backend security
    template_params: {
      user_name: name,    // Must match {{user_name}} in your EmailJS template
      user_email: email,  // Must match {{user_email}} in your EmailJS template
      message: message,   // Must match {{message}} in your EmailJS template
      reply_to: email     // Optional: Allows you to reply directly to the user
    }
  };

  try {
    // 3. Send POST request to EmailJS
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailJsData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    console.log('✅ Email sent via EmailJS API:', response.data);
    res.status(200).json({ message: 'Email sent successfully!' });
    
  } catch (error) {
    console.error('❌ EmailJS Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.response ? error.response.data : error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});