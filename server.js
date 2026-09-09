const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Handle Contact Form Submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In a real application, you would save this to a database or send an email here
    console.log(`[NEW ENQUIRY] Name: ${name} | Email: ${email}`);
    console.log(`Message: ${message}`);

    // Send a success response back to the client
    res.status(200).json({ success: true, message: 'Your enquiry has been received.' });
});

// 2. Handle Member Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log(`[LOGIN ATTEMPT] User: ${email}`);

    // Mock authentication logic (Replace with real database validation)
    if (email && password) {
        // Successful login
        res.status(200).json({ success: true, redirect: '/member-portal.html' });
    } else {
        // Failed login
        res.status(401).json({ success: false, message: 'Invalid access key or ID.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Serving static files from /public`);
});