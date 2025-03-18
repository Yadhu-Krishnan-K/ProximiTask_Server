import client from "../../../config/redisClient.js";
import InitialSignUp from "../../../domain/usecases/Users/initiateUserSignUp.js";
import UserRepository from "../../repositories/UserRepository.js";
import otpService from "../../../services/otpService.js";
import bcrypt from 'bcryptjs'
import UserSignUp from "../../../domain/usecases/Users/UserSignUp.js";

const userRepository = new UserRepository();

const initiateRegistration = async (req, res, next) => {

  const userData = req.body;
  console.log('userData from initiateRegistration = ',userData)
  
  const initialSignUp = new InitialSignUp({
    userRepository: new UserRepository(),
    otpService,
    redisClient: client,
    bcrypt,
  });

  try {
    const response = await initialSignUp.execute(userData);
    console.log("res = ", response);
    res
      .status(response.status)
      .json({ success: response.success, message: response.message });
  } catch (error) {
    console.error("Error in initiateRegistration:", error);
    next(error);
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


export {
    initiateRegistration,
    signUp
}