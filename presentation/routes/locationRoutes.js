import { Router } from "express";
import { addLocation,deleteLocation,getLocations } from "../../interface/controllers/Admin/locationControll.js";
const router = Router()

router.route('/')
      .get(getLocations)
      .post(addLocation)
router.route('/:id')
      .delete(deleteLocation)

export default router