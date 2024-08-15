import UserRepository from "../repositories/UserRepository.js";
import UserSignUp from "../../domain/usecases/Users/UserSignUp.js";
import UserLogin from "../../domain/usecases/Users/UserLogin.js";
import client from "../../config/redisClient.js";
import InitialSignUp from "../../domain/usecases/Users/initiateUserSignUp.js";
import otpService from "../../services/otpService.js";
import bcrypt from 'bcryptjs';
import jwt from "../../utils/jwt.js";
import UpdateStatus from "../../domain/usecases/Users/UpdateStatus.js";
import CustomError from "../../config/CustomError.js";

const userRepository = new UserRepository();

const initiateRegistration = async (req, res, next) => {
  console.log("reached initialSignup, body=", req.body);
  const userData = req.body;
  
  const initialSignUp = new InitialSignUp({
    userRepository: new UserRepository(),
    otpService,
    redisClient: client,
    bcrypt
  });

  try {
    const response = await initialSignUp.execute(userData);
    console.log('res = ', response);
    res.status(response.status).json({ success: response.success, message: response.message });
  } catch (error) {
    console.error('Error in initiateRegistration:', error);
    next(error);
  }
};

const signUp = async (req, res, next) => {
  console.log('reached sign up');
  try {
    const otp = req.body.otp;
    const cliOtp = await client.get('otp');
    const ttl = await client.ttl('otp');
    console.log(cliOtp, ttl);
    
    if (otp == cliOtp && ttl > 0) {
      const data = await client.get('userData');
      console.log('userData = ', data);

      const userSignUp = new UserSignUp(userRepository);
      const user = await userSignUp.execute(data);
      console.log('going to send response');
      res.status(201).json({ success: true });
    } else {
      throw new CustomError('Invalid or expired OTP', 400);
    }
  } catch (error) {
    console.error('Error during signUp:', error);
    next(error); // Use next to pass error to centralized handler
  }
};

const login = async (req, res, next) => {
  console.log(req.body);
  const userLogin = new UserLogin(userRepository);
  
  try {
    const user = await userLogin.execute(req.body);
    const refreshToken = jwt.generateRefreshToken(req.body.email);
    const accessToken = jwt.generateAccessToken(req.body.email);

    console.log(`access token = ${accessToken}, refresh Token = ${refreshToken}`);
    res.status(200).json({ 
      success: true, 
      user: { name: user.username, email: user.email }, 
      refreshToken, 
      accessToken 
    });
  } catch (error) {
    console.error('Error during login:', error);
    next(new CustomError('Invalid login credentials', 400));
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
      return next(new CustomError('User ID is required', 400));
    }

    const updateStatusUseCase = new UpdateStatus(userRepository);
    const updatedUser = await updateStatusUseCase.execute(userId);

    if (!updatedUser) {
      return next(new CustomError('User not found', 404));
    }

    res.status(200).json({ success: true, message: 'User status updated' });
  } catch (error) {
    console.error('Error updating status:', error);
    next(new CustomError('Server error', 500));
  }
};

export { signUp, login, initiateRegistration, getUsers, updateStatus };
