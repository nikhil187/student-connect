const express = require('express');
const cors = require('cors');
const app = express();
const profilesRouter = require('./routes/profiles');

// Determine the CORS origin based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const corsOrigin = isDevelopment ? 'http://localhost:3001' : '*';

// CORS configuration
app.use(cors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Test endpoint
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});

// Profiles routes
app.use('/api/profiles', profilesRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;