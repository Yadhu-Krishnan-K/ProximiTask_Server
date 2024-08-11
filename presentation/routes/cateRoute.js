import { Router } from "express";
import { addCategory,deleteCategory,updateCategory,getCategory } from "../../interface/controllers/Admin/categoryControll.js";

const router = Router();

router.route('/')
.post(addCategory)
.get(getCategory)

router.route('/:id')
.put(updateCategory)
.delete(deleteCategory)

export default router