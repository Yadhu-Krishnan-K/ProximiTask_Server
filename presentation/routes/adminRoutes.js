import { Router } from "express";

import { adminLogin } from "../../interface/controllers/Admin/adminControll.js";

const router = Router()

router.post('/login',adminLogin)

export default router