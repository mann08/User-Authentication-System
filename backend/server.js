// server.js - Entry point for the Express backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// =====================
// Middleware
// =====================

// Allow cross-origin requests from the React frontend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// =====================
// Routes
// =====================

// Import authentication routes
const authRoutes = require('./routes/authRoutes');

// Mount auth routes under /api/auth
app.use('/api/auth', authRoutes);

// Root health check route
app.get('/', (req, res) => {
  res.json({ message: 'Auth API is running...' });
});

const { MongoMemoryServer } = require('mongodb-memory-server');

// =====================
// Database Connection & Server Start
// =====================

const startServer = async () => {
  try {
    // Start an in-memory MongoDB instance
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    console.log('🔄 Starting MongoDB Memory Server...');

    // Connect mongoose to the in-memory instance
    await mongoose.connect(mongoUri);
    console.log('✅ In-Memory MongoDB connected successfully (Local Demo Mode)');

    // Start Express server only after DB connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('⚠️  Note: Database is in memory. Data will be lost when server restarts.');
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
