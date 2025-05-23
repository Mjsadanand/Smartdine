import express from 'express';
import Customer from '../models/Customer.js';
import Menu from '../models/MenuItem.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import passport from 'passport';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: 'All fields required' });

    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const customer = await Customer.create({ name, email, password: hashed });
    res.status(201).json({ msg: 'Registered', customer: { name: customer.name, email: customer.email, _id: customer._id } });
  } catch (err) {
    res.status(500).json({ msg: 'Registration failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, customer.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, customer: { name: customer.name, email: customer.email, _id: customer._id } });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
});

// Middleware to verify JWT
const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: 'No token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.customerId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

// Get profile
router.get('/profile', auth, async (req, res) => {
  const customer = await Customer.findById(req.customerId).select('-password');
  if (!customer) return res.status(404).json({ msg: 'Not found' });
  res.json(customer);
});

// Add scanned menu (call this when QR is scanned)
router.post('/scan', auth, async (req, res) => {
  const { menuId } = req.body;
  if (!menuId) return res.status(400).json({ msg: 'menuId required' });
  const customer = await Customer.findById(req.customerId);
  if (!customer) return res.status(404).json({ msg: 'Not found' });

  // Prevent duplicate scans
  if (!customer.scannedMenus.some(m => m.menuId.toString() === menuId)) {
    customer.scannedMenus.push({ menuId });
    await customer.save();
  }
  res.json({ msg: 'Scan recorded' });
});

// Get scanned menus
router.get('/scanned-menus', auth, async (req, res) => {
  const customer = await Customer.findById(req.customerId).populate({
    path: 'scannedMenus.menuId',
    select: 'name qrCode',
  });
  if (!customer) return res.status(404).json({ msg: 'Not found' });
  res.json(customer.scannedMenus);
});

// const token = localStorage.getItem('customerToken');
// axios.get('http://localhost:5000/api/customer/profile', {
//   headers: { Authorization: `Bearer ${token}` }
// });

// Start Google OAuth
router.get('/auth/google',
  passport.authenticate('customer-google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/auth/google/callback',
  passport.authenticate('customer-google', { session: false, failureRedirect: 'http://localhost:5173/customer/login' }),
  (req, res) => {
    // Generate JWT for the customer
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Redirect to frontend with token as query param
    res.redirect(`http://localhost:5173/customer/panel?token=${token}`);
  }
);

export default router;