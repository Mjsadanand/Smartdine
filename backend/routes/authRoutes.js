import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/authController.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/failed' }), async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.user.googleId });
    if (user) {
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      // Redirect with token and username as query params
      res.redirect(`https://smartdine.onrender.com/oauth-success?token=${token}&username=${user.username}`);
    } else {
      res.redirect('/login/failed');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login/failed');
  }
});

export default router;
