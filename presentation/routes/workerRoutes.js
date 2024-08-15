import { Router } from 'express';

import { signup, getAllWorkers, accessControll, deleteWorker, login } from '../../interface/controllers/Workers/workerControll.js';

const router = Router();

router.post('/signup',signup)

router.route('/')
.get(getAllWorkers)
.patch(accessControll)
router.route('/:id')
.delete(deleteWorker)

router.route('/signin')
      .post(login)

export default router;
