import { Router } from 'express';
import multer from 'multer'

import { 
            signup,
            resendOtp,
            postSignupWorks,
            getAllWorkers,
            accessControll, 
            deleteWorker, 
            login, 
            changeStatus, 
            getWorker, 
            createBooking, 
            getBookingsByUser, 
            getListOfBooking,
            updateWorkerDetails,
            getWorkersByCateName,
            addedLeave,
            getLeaves,
            bookedDates
      } from '../../interface/controllers/Workers/workerControll.js';
import authMiddleware from '../../middlewares/accessToken.js';

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({storage})

router.post('/signup',upload.fields([{name:'originalImg'},{name:'croppedImg'}]),signup)

router.route('/')
      .get(getAllWorkers)
      .patch(authMiddleware('admin'), accessControll)
router.route('/resendOtp')
      .get(resendOtp)
router.route('/postSignup')
      .post(postSignupWorks)
router.route('/:id')
      .delete(authMiddleware('admin'), deleteWorker)
      .patch(authMiddleware('admin'), changeStatus)
      .get(getWorker)
router.route('/signin')
      .post(login)
router.route('/worker/:id')
      .put(updateWorkerDetails)
router.route('/booking')
      .post(createBooking)
router.route('/booking/:id')
      .get(getBookingsByUser)
router.route('/booking/list/:id')
      .get(getListOfBooking)
router.route('/:cateName')
      .get(getWorkersByCateName)

//booked dates
router.route('/:id/booked-dates')
      .get(bookedDates)
//leave dates
router.route('/leave-dates/:id')
      .get(getLeaves)
      .patch(addedLeave)

// router.route('/workerDetailsfromBooking/id')
//       .get()


export default router;