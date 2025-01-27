import { Router } from 'express';
import multer from 'multer'

import { 
      signUp, 
      login, 
      initiateRegistration, 
      getUsers, 
      updateStatus, 
      googleLogin, 
      resendOtp, 
      getUserData, 
      requestForPasswordChange, 
      userEmailOrAndNameUpdate 
} from '../../interface/controllers/UserController.js';
import authMiddleware from '../../middlewares/accessToken.js';

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({storage})

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

router.route('/security')
      .put(requestForPasswordChange)
router.route('/update/:id')
      .patch(userEmailOrAndNameUpdate)

// router.route('/address')
//       .post('createNewAddress')
//       .put('editAddress')
//       .delete('deleteAddress')
export default router;