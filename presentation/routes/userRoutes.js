import { Router } from 'express';
import { signUp, login, initiateRegistration, getUsers, updateStatus, googleLogin, resendOtp, getUserData } from '../../interface/controllers/UserController.js';
import authMiddleware from '../../middlewares/accessToken.js';
const router = Router();

router.post('/initiateSignup', initiateRegistration);
router.post('/signup',signUp)
router.post('/login', login);
router.post('/resend-otp',resendOtp)
router.route('/')
      .get(authMiddleware('admin'), getUsers)
      .patch(authMiddleware('admin'), updateStatus)
router.route('/:email')
      .get(getUserData)
      
router.route('/google-login')
      .post(googleLogin)
export default router;