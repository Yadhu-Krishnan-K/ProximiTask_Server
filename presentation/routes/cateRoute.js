import { Router } from "express";
import multer from 'multer'

import { 
          addCategory,
          deleteCategory,
          updateCategory,
          getCategory,
          getCateByName,
          getCate 
       } from "../../interface/controllers/Admin/categoryControll.js";
import authMiddleware from "../../middlewares/accessToken.js";

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({storage})

router.route('/')
.post(authMiddleware('admin'), upload.fields([{name:'originalImage'},{name:'croppedImage'}]), addCategory)
.get(getCategory)

router.route('/:id')
.put(authMiddleware('admin'), upload.fields([{name:'originalImage'},{name:'croppedImage'}]), updateCategory)
.delete(authMiddleware('admin'), deleteCategory)
.get(getCate)

router.route('/:cateName')
.get(getCateByName)

export default router