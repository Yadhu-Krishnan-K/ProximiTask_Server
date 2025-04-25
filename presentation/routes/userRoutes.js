import { Router } from 'express';
import multer from 'multer';

import limiter from '../../middlewares/express-rate-limit.js';

import { 
  getUsers, 
  updateStatus, 
  resendOtp, 
  getUserData, 
  requestForPasswordChange, 
  userEmailOrAndNameUpdate, 
  searchNeed
} from '../../interface/controllers/Users/UserController.js';

import authMiddleware from '../../middlewares/accessToken.js';
import {
  login,
  googleLogin
} from '../../interface/controllers/Users/loginController.js';

import { initiateRegistration, signUp } from '../../interface/controllers/Users/signupController.js';
import logout from '../../interface/controllers/Users/logoutController.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Authentication & Registration
router.post('/initiateSignup', initiateRegistration);
router.post('/signup', signUp);
router.post('/login', limiter, login);
router.post('/resend-otp', resendOtp);

// Logout (must come before /:email)
router.get('/logout', logout);

// User info (protected)
router.route('/')
  .get(authMiddleware, getUsers)
  .patch(authMiddleware, updateStatus);

// Google login
router.route('/google-login')
  .post(googleLogin);

// Email or name update
router.route('/update/:id')
  .patch(userEmailOrAndNameUpdate);

// Security - password change
router.route('/security')
  .put(requestForPasswordChange);

// Search worker categories
router.get('/workers-categories/:text', searchNeed);

// 🔻 MUST COME LAST — dynamic route
router.route('/:email')
  .get(getUserData);

export default router;
