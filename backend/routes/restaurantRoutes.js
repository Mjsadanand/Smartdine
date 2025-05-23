import express from 'express';
import passport from 'passport';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'restaurants',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});
const upload = multer({ storage });

// Middleware to handle both Passport and JWT authentication
const authenticate = (req, res, next) => {
  if (req.headers.authorization) {
    // Use JWT authentication for form login users
    return verifyJWT(req, res, next);
  } else {
    // Use Passport authentication for Google login users
    return passport.authenticate('session')(req, res, next);
  }
};

// Protect all routes with the combined authentication middleware
router.use(authenticate);

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Fetch all restaurants
    res.json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ msg: 'Failed to fetch restaurants' });
  }
});

// Add restaurant
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, location, contactNumber } = req.body;
    const imageUrl = req.file.path;

    const newRestaurant = new Restaurant({
      username: req.user.username,
      name,
      location,
      contactNumber,
      imageUrl,
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update restaurant
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, location, contactNumber } = req.body;
    const updateData = { name, location, contactNumber };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ msg: 'Restaurant not found' });
    }

    res.json(updatedRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete restaurant
router.delete('/delete/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurant not found' });
    }

    if (restaurant.username !== req.user.username) {
      return res.status(403).json({ msg: 'User not authorized to delete this restaurant' });
    }

    await restaurant.deleteOne();
    res.json({ msg: 'Restaurant deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get restaurants by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const restaurants = await Restaurant.find({ username: user.username });
    if (!restaurants.length) return res.status(404).json({ msg: 'No restaurants found for this user' });

    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;

