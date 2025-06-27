import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/authController.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

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
      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Login Notification',
        text: `Hello ${user.username},\n\nYou have successfully logged in using Google OAuth.\n\nIf this wasn't you, please contact support immediately.`
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
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
