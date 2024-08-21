import { Router } from 'express';
import { signUp, login, initiateRegistration, getUsers, updateStatus, googleLogin, resendOtp } from '../../interface/controllers/UserController.js';
const router = Router();

router.post('/initiateSignup', initiateRegistration);
router.post('/signup',signUp)
router.post('/login', login);
router.post('/resend-otp',resendOtp)
router.route('/')
      .get(getUsers)
      .patch(updateStatus)
router.route('/google-login')
      .post(googleLogin)
export default router;