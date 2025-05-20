import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
// import cookieSession from 'cookie-session';
import session from 'express-session';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import './passport/googleStrategy.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { checkConsent } from './middleware/consentMiddleware.js';
import cookieParser from 'cookie-parser';
import Visitor from './models/Visitor.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'https://smartdine.onrender.com', // Frontend URL
  credentials: true, // Allow credentials (cookies)
}));

app.use(cookieParser());

app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/analytics', analyticsRoutes);

app.post('/api/store-interaction', async (req, res) => {
  try {
    const { name, mobile, menuId, subscriberId } = req.body;
    // Save all fields, including subscriberId
    const visitor = new Visitor({ name, mobile, menuId, subscriberId });
    await visitor.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check or root
app.get('/', (req, res) => res.send('Server is running!'));

// Catch-all: serve index.html for client-side routing (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
