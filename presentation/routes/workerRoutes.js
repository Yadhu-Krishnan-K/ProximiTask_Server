import { Router } from 'express';

import { signup } from '../../interface/controllers/Workers/workerControll.js';

const router = Router();

router.post('/signup',signup)

export default router;
