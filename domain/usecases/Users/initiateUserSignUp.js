import CustomError from "../../../config/CustomError.js";

class InitialSignUp {
    constructor({ userRepository, otpService, redisClient, bcrypt }) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.redisClient = redisClient;
        this.bcrypt = bcrypt
    }

    async execute(userData) {
        try {
            const existingUser = await this.userRepository.findUserByEmail(userData.email);
            if (existingUser) {
                // return { success: false, message: "User already exists",status:409 };
                throw new CustomError('User already exist',409)
            }
            console.log(userData)
            const otp = await this.otpService(userData.email)
            const hashPass = await this.bcrypt.hash(userData.pass, 10);
            userData.pass = hashPass
            const userDataString = JSON.stringify(userData);

            await this.redisClient.set('userData', userDataString);
            await this.redisClient.setEx('otp', 300, otp);

            return { success: true, message: "OTP sent", otp ,status:200}; // Return otp for testing purposes, remove in production
        } catch (error) {
            // console.error('Error during sign-up process:', error);
            throw error
            // return { success: false, message: "An error occurred during sign-up",status:500 };
        }
    }
}

export default InitialSignUp;