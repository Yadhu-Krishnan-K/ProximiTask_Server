import WorkerRepository from "../../repositories/WorkerRepository.js";
import SignUp from "../../../domain/usecases/Workers/SignUp.js";
import Login from "../../../domain/usecases/Workers/Login.js";
import CustomError from "../../../config/CustomError.js";
import jwt from "../../../utils/jwt.js";
import {uploadToCloudinary} from "../../../utils/CloudinaryUpload.js";
import CreateBookingUseCase from "../../../domain/usecases/Bookings/CreateBookingUseCase.js";
import BookingRepository from "../../repositories/BookingRepository.js";
import mongoose from "mongoose";
import otpService from "../../../services/otpService.js";
import CateRepo from "../../repositories/CategoryRepository.js";
import client from "../../../config/redisClient.js";
import ImgUpload from "../../../utils/ImgUpload.js";
import { sendConfirmationEmail } from "../../../services/confirmationMail.js";

const workerRepository = new WorkerRepository();
const bookingRepository = new BookingRepository()
const cateRepository = new CateRepo()

const signup = async (req, res, next) => {
    console.log('Reached worker controller');
    let workerData = req.body;
    const files = req.files

    // const category =await cateRepository.getCateByName(workerData.category)

    const originalImageBuffer = files.originalImg[0].buffer
    const croppedImageBuffer = files.croppedImg[0].buffer
    const [originalImageResult, croppedImageResult] = await Promise.all([
        uploadToCloudinary(originalImageBuffer, 'your_folder_name/original_images'),
        uploadToCloudinary(croppedImageBuffer, 'your_folder_name/cropped_images')
    ]);    
    let originalImgPublicId = originalImageResult.public_id
    let originalImgURL = originalImageResult.secure_url
    let croppedImgPublicId = croppedImageResult.public_id
    let croppedImgURL = croppedImageResult.secure_url   
    console.log('completed uploading to cloudinary---------------------------------')
    
    workerData = {
        ...workerData,
        originalImgURL: originalImgURL,
        originalImgPublicId: originalImgPublicId,
        croppedImgURL: croppedImgURL,
        croppedImgPublicId: croppedImgPublicId
    }
    try {
        console.log(workerData)
        // const worker = new SignUp(workerRepository);
        // const data = await worker.execute(workerData); // Await the result of async call
        const workerDatastring = JSON.stringify(workerData)
        console.log('workerData converted to string')
        client.set('workerData',workerDatastring)
        console.log('workerData stored in redis client')
        const otp = await otpService(workerData.email)
        console.log('otp service runned.... otp = ',otp);

        client.setEx('wOtp',30,otp)
        console.log('otp stored in redis for 30 seconds');

        console.log('going to return response....');
        
        return res.status(201).json({ success: true });

    } catch (error) {
        console.log('error = ',error)
        next(error);  // Pass error to centralized handler
    }
};
const resendOtp = async(req, res, next) => {
    console.log("resend otp reached");
    try {
      let data = JSON.parse(await client.get("workerData"));
      console.log("workerData = ", data);
      const otp = await otpService(data.email)
      client.setEx('wOtp', 59, otp)
      console.log('otp = ',otp)
      res.status(200).json({success:true})
    } catch (error) {
      console.log('errror = ',error.message)
      next(error)
    }
};

const postSignupWorks = async (req, res, next) => {
    console.log("reached sign up");
  try {
    const otp = req.body.otp.join("");
    console.log('reached otp = ',otp)
    const cliOtp = await client.get("wOtp");
    const ttl = await client.ttl("wOtp");
    console.log(cliOtp, ttl);

    if (otp == cliOtp && ttl > 0) {
        console.log('otp verifucation success-0--==--=')
      const data = JSON.parse(await client.get("workerData"));
       const worker = new SignUp(workerRepository);
       const result = await worker.execute(data); 

    //   console.log("going to send response, by the way user = ",user);
      res.status(201).json({ success: true });
    } else {
      throw new CustomError("Invalid or expired OTP", 400);
    }
  } catch (error) {
    console.error("Error during signUp:", error);
    next(error);
  }
}

const getWorker = async (req, res, next) => {
    try {
        const workerId = req.params.id
        const worker = await workerRepository.findWorker(workerId)
        console.log('getworker Worker = ', worker)
        return res.status(200).json({ success: true, worker })
    } catch (error) {
        console.log('error == ', error)
        next(error)
    }
}

const getAllWorkers = async (req, res, next) => {
    try {
        const workerList = await workerRepository.findWorkers();
        return res.status(200).json({ success: true, list: workerList });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
};

const accessControll = async (req, res, next) => {
    const { worker_id } = req.body;
    try {
        const worker = await workerRepository.access(worker_id);
        if (worker) {
            await sendConfirmationEmail(worker.email,worker.name)
            return res.status(201).json({ success: true });
        } else {
            throw new CustomError('Worker not found', 404);
        }
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
};

const deleteWorker = async (req, res, next) => {
    const worker_id = req.params.id;
    console.log('workerID = ', worker_id);
    try {
        const done = await workerRepository.deleteWorker(worker_id);
        if (done) {
            return res.status(201).json({ success: true });
        } else {
            throw new CustomError('Failed to delete worker', 500);
        }
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const refreshToken = jwt.generateRefreshToken(email, 'worker');
        const accessToken = jwt.generateAccessToken(password, 'worker');
        const UserLoginUseCase = new Login(workerRepository);
        const worker = await UserLoginUseCase.execute({ email, password });
        console.log('worker when logging in ===== ', worker);
        return res.status(200).json({ success: true, worker, refreshToken, accessToken });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
};

const changeStatus = async (req, res, next) => {
    const worker_id = req.params.id;
    console.log('workerID = ', worker_id);
    try {
        const worker = await workerRepository.statusChange(worker_id);
        return res.status(200).json({ success: true })
    } catch (error) {
        next(error)
    }
}

const createBooking = async (req, res, next) => {
    console.log('booking starting');
    console.log('data from body = ', req.body)
    try {
        const useCaseForBooking = new CreateBookingUseCase(bookingRepository)
        const booked = await useCaseForBooking.execute(req.body)
        console.log('booked = ', booked)
        return res.status(200).json({ success: true })
    } catch (error) {
        console.log('error = ', error)
        next(error)
    }
}

const getBookingsByUser = async (req, res, next) => {
    try {
        console.log('params == ',req.params.id)
        const userId = new mongoose.Types.ObjectId(req.params.id)
        const bookings = await bookingRepository.getBookingsByUser(userId)
        return res.status(200).json({success:true, list:bookings})
        
    } catch (error) {
        console.log('error from getBookingsByUser = ',)
        next(error)
    }
}
const getListOfBooking = async (req,res,next) => {
    try {
        const workerId = new mongoose.Types.ObjectId(req.params.id)
        const listOfBooking = await bookingRepository.getListFromWorker(workerId)
        console.log('list of booking from getList of booking ==---==',listOfBooking)
        return res.status(200).json({success:true, list:listOfBooking})
    } catch (error) {
        console.log('error from getListOfBooking = ',error)
        next(error)
    }
}

const updateWorkerDetails = async (req,res,next) => {
    console.log('data from req = ',req.body)
    console.log("workerId = ",req.params)
    try {
        const data = req.body
        const workerId = new mongoose.Types.ObjectId(req.params.id)
        workerRepository.updateWorker(workerId,data)
        res.status(200).json({success:true, data})
    } catch (error) {
        console.log('error',error)
        next(error)
    }
}

const getWorkersByCateName = async (req,res,next) => {
    try {
        const cateName = req.params.cateName
        const workers = await workerRepository.findByCateName(cateName)
        res.status(200).json({success:true, workerList:workers})
    } catch (error) {
        console.log('error = ',error)
        next(error)
    }
}

const addedLeave = async (req,res,next) => {
    try {
        const leaveDate = req.body
        const worker_id = req.params.id
        const result = await workerRepository.addLeave(worker_id,leaveDate)
        console.log('added leave date = ',leaveDate)
        if(result)return res.status(201).json({success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getLeaves = async (req,res,next) => {
    try {
        console.log('reached getLeaves')
        const worker_id = req.params.id
        const list = await workerRepository.getLeave(worker_id)
        return res.status(200).json({success:true,list:list.leaveDays})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const bookedDates = async (req,res,next) => {
    try {
        const workerId = req.params.id
        const list = await bookingRepository.getBookedDates(workerId)
        console.log('list = ',list)
        return res.status(200).json({success:true, list})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export { 
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
    };