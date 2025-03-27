import { Router } from 'express';
import multer from 'multer'

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

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({storage})

router.post('/initiateSignup', initiateRegistration);
router.post('/signup',signUp)
router.post('/login', limiter, login);
router.post('/resend-otp',resendOtp)
router.route('/')
      .get(authMiddleware, getUsers)
      .patch(authMiddleware, updateStatus)
router.route('/:email')
      .get(getUserData)
      
router.route('/google-login')
      .post(googleLogin)

router.route('/security')
      .put(requestForPasswordChange)
router.route('/update/:id')
      .patch(userEmailOrAndNameUpdate)

router.get('/workers-categories/:text',searchNeed)

// router.route('/address')
//       .post('createNewAddress')
//       .put('editAddress')
//       .delete('deleteAddress')
export default router;