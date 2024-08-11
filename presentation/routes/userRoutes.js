import { Router } from 'express';
import { signUp, login, initiateRegistration, getUsers, updateStatus } from '../../interface/controllers/UserController.js';
const router = Router();

router.post('/initiateSignup', initiateRegistration);
router.post('/signup',signUp)
router.post('/login', login);
router.route('/')
      .get(getUsers)
      .patch(updateStatus)
export default router;