import { Router } from 'express';
import { signup, getAllWorkers, accessControll, deleteWorker, login, changeStatus } from '../../interface/controllers/Workers/workerControll.js';
import authMiddleware from '../../middlewares/accessToken.js';

const router = Router();

router.post('/signup',signup)

router.route('/')
.get(getAllWorkers)
.patch(authMiddleware('admin'), accessControll)
router.route('/:id')
.delete(authMiddleware('admin'), deleteWorker)
.patch(changeStatus)
router.route('/signin')
      .post(login)

export default router;
