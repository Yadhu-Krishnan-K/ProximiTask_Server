import UserRepository from "../../repositories/UserRepository.js";
import UserSignUp from "../../../domain/usecases/Users/UserSignUp.js";
import UserLogin from "../../../domain/usecases/Users/UserLogin.js";
import client from "../../../config/redisClient.js";
import InitialSignUp from "../../../domain/usecases/Users/initiateUserSignUp.js";
import otpService from "../../../services/otpService.js";
import bcrypt from "bcryptjs";
import jwt from "../../../utils/jwt.js";
import UpdateStatus from "../../../domain/usecases/Users/UpdateStatus.js";
import UpdateUserNameAndEmail from "../../../domain/usecases/Users/UpdateUserName.js";
import CustomError from "../../../config/CustomError.js";
import FindUser from "../../../domain/usecases/Users/FindUser.js";
import ImgUpload from "../../../utils/ImgUpload.js";
import mongoose, { Mongoose } from "mongoose";
import FindWorkersAndCategories from "../../../domain/usecases/Users/FindWorkersAndCategoriesUseCase.js";
import WorkersAndCategoriesRepository from "../../repositories/WorkersAndCategoryRepository.js";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { name } from "ejs";

const userRepository = new UserRepository();


const resendOtp = async(req, res, next) => {
  console.log("resend otp reached");
  try {
    let data = JSON.parse(await client.get("userData"));
    console.log("userData = ", data);
    const otp = await otpService(data.email)
    client.setEx('otp', 30, otp)
    console.log('otp = ',otp)
    res.status(200).json({success:true})
  } catch (error) {
    console.log('errror = ',error.message)
    next(error)
  }
};

const signUp = async (req, res, next) => {
  console.log("reached sign up");
  try {
    const otp = req.body.otp;
    const cliOtp = await client.get("otp");
    const ttl = await client.ttl("otp");
    console.log(cliOtp, ttl);

    if (otp == cliOtp && ttl > 0) {
      const data = JSON.parse(await client.get("userData"));
      console.log("userData = ", data);

      const userSignUp = new UserSignUp(userRepository);
      const user = await userSignUp.execute(data);
      console.log("going to send response, by the way user = ",user);
      res.status(201).json({ success: true });
    } else {
      throw new CustomError("Invalid or expired OTP", 400);
    }
  } catch (error) {
    console.error("Error during signUp:", error);
    next(error);
  }
};

// Controller: userController.js
const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.query; // Default to page 1, 2 items per page
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const [userList, totalUsers] = await Promise.all([
      userRepository.findAllUsers(pageNumber, limitNumber),
      userRepository.countUsers(),
    ]);

    const totalPages = Math.ceil(totalUsers / limitNumber);

    res.status(200).json({
      success: true,
      data: userList,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
};



const updateStatus = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return next(new CustomError("User ID is required", 400));
    }

    const updateStatusUseCase = new UpdateStatus(userRepository);
    const updatedUser = await updateStatusUseCase.execute(userId);

    if (!updatedUser) {
      return next(new CustomError("User not found", 404));
    }

    res.status(200).json({ success: true, message: "User status updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    next(error);
  }
};


const getUserData = async(req,res,next) => {
  try {
    const email = req.params.email
    const user = await new FindUser(userRepository).execute(email)
    console.log('user Data = ',user)
    res.status(200).json({user:{name:user.username,email:user.email,isActive:user.isActive}})
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const requestForPasswordChange = async (req,res,next) => {
  try {
    const {oldPassword, newPassword, email} = req.body
    const oldPassCheck = await userRepository.checkPass(oldPassword,email)
    if(oldPassCheck.success){
      await userRepository.changePass(email,newPassword)
    }else{
      throw new CustomError("Old password Incorrect!",400)
    }
    return res.status(200).json({success:true})
  } catch (error) {                                                                                                                                              
    console.log(error)
    next(error)
  }
}

const userEmailOrAndNameUpdate = async (req,res,next) => {
  try {
    console.log('name and email = ',req.body);
    console.log('params._id = ',req.params.id)
    const {name,email} = req.body
    const id = new mongoose.Types.ObjectId(req.params.id)
    const updateUseCase = new UpdateUserNameAndEmail(userRepository)
    const status = updateUseCase.execute(id,name,email)
    if(status.success){
      res.status(201).json({success:true})
    }
  } catch (error) {
    console.log('error = ',error)
    next(error)
  }
}

const searchNeed = async (req, res, next) => {
  try {
    let text = req.params.text
    const repository = new WorkersAndCategoriesRepository()
    const useCase = new FindWorkersAndCategories(repository)
    const result = useCase.execute(text)
    res.status(200).json({data:result})
  } catch (error) {
    console.log('error from searchNeed...',error)
  }
}

export {
  getUsers,
  updateStatus,
  resendOtp,
  getUserData,
  requestForPasswordChange,
  userEmailOrAndNameUpdate,
  searchNeed
};
