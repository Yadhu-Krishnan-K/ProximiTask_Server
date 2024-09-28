import UserRepository from "../repositories/UserRepository.js";
import UserSignUp from "../../domain/usecases/Users/UserSignUp.js";
import UserLogin from "../../domain/usecases/Users/UserLogin.js";
import client from "../../config/redisClient.js";
import InitialSignUp from "../../domain/usecases/Users/initiateUserSignUp.js";
import otpService from "../../services/otpService.js";
import bcrypt from "bcryptjs";
import jwt from "../../utils/jwt.js";
import UpdateStatus from "../../domain/usecases/Users/UpdateStatus.js";
import CustomError from "../../config/CustomError.js";
import FindUser from "../../domain/usecases/Users/FindUser.js";
import ImgUpload from "../../utils/ImgUpload.js";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { name } from "ejs";

const userRepository = new UserRepository();

const initiateRegistration = async (req, res, next) => {
  
  console.log("reached initialSignup, body=", req.body);
  const imgsData = req.files;
  console.log('imgData from initaiteRegistration == ',imgsData)


  const userData = req.body;
  // const imgUpload = new ImgUpload(originalImageBuffer,croppedImageBuffer)
  // const [originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL] = await imgUpload.uploadImages()


  const initialSignUp = new InitialSignUp({
    userRepository: new UserRepository(),
    otpService,
    redisClient: client,
    bcrypt,
  });

  try {
    const response = await initialSignUp.execute(userData,imgsData);
    console.log("res = ", response);
    res
      .status(response.status)
      .json({ success: response.success, message: response.message });
  } catch (error) {
    console.error("Error in initiateRegistration:", error);
    next(error);
  }
};

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

      const originalImageBuffer = data.imgs.userImg[0].buffer
      const croppedImageBuffer = data.imgs.croppedImg[0].buffer
      const imgUpload = new ImgUpload(originalImageBuffer,croppedImageBuffer)
      const [originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL] = await imgUpload.uploadImages()
      let imgObj = {
        originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL
      }
      console.log("userData = ", data);

      const userSignUp = new UserSignUp(userRepository);
      const user = await userSignUp.execute(data,imgObj);
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

const login = async (req, res, next) => {
  console.log('body === ',req.body);
  const userLogin = new UserLogin(userRepository);

  try {
    const user = await userLogin.execute(req.body);
    const refreshToken = jwt.generateRefreshToken(req.body.email);
    const accessToken = jwt.generateAccessToken(req.body.email, "user");
    console.log('userData while login in === ',user)
    // console.log(`access token = ${accessToken}, refresh Token = ${refreshToken}`);
    res.status(200).json({
      success: true,
      user: { 
        name: user.username, 
        email: user.email, 
        isActive:user.isActive, 
        originalImgURL:user.originalImgURL,
        originalImgPublicId: user.originalImgPublicId,
        croppedImgURL:user.croppedImgURL,
        croppedImgPublicId:user.croppedImgPublicId 
      },
      refreshToken,
      accessToken
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const userList = await userRepository.findAllUsers();
    res.status(200).json({ success: true, data: userList });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(new CustomError("An error occurred while fetching users.", 500));
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
    next(new CustomError("Server error", 500));
  }
};

const googleLogin = async (req, res, next) => {
  const { token } = req.body;
  try {
    const details = jwt.decoded(token);
    console.log(details);
    console.log(`email from google login=${details.email}---------------------================----------------------==========================`)
    const findUserUseCase = new FindUser(userRepository);
    const user = await findUserUseCase.execute(details.email);
    console.log("user from googleLogin = ", user);
    if (!user) {
      const userSignUp = new UserSignUp(userRepository);
      const user = await userSignUp.execute({
        email: details.email,
        name: details.name,
        googleLogin: true,
      },
      {
        
      }
    );
      const refreshToken = jwt.generateRefreshToken(details.email);
      const accessToken = jwt.generateAccessToken(details.email, "user");

      return res.status(200).json({
        success: true,
        user: { name: user.username, email: user.email, isActive:user.isActive },
        refreshToken,
        accessToken,
      });
    } else {
      // const userLogin = new UserLogin(userRepository);
      // const userG = await userLogin.execute();
      const refreshToken = jwt.generateRefreshToken(details.email);
      const accessToken = jwt.generateAccessToken(details.email, "user");

      res.status(200).json({
        success: true,
        user: { name: details.name, email: details.email, isActive:user.isActive },
        refreshToken,
        accessToken,
      });
    }
  } catch (error) {
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

export {
  signUp,
  login,
  initiateRegistration,
  getUsers,
  updateStatus,
  googleLogin,
  resendOtp,
  getUserData
};


