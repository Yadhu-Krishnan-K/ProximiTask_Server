import { Router } from "express";
import { addCategory,deleteCategory,updateCategory,getCategory } from "../../interface/controllers/Admin/categoryControll.js";
import authMiddleware from "../../middlewares/accessToken.js";

const router = Router();

router.route('/')
.post(authMiddleware('admin'), addCategory)
.get(authMiddleware('admin'), getCategory)

router.route('/:id')
.put(authMiddleware('admin'), updateCategory)
.delete(authMiddleware('admin'), deleteCategory)

export default router