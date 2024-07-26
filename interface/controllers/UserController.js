import UserRepository from '../repositories/UserRepository.js';
import UserSignUp from '../../domain/usecases/UserSignUp.js';
import UserLogin from '../../domain/usecases/UserLogin.js';
import client from '../../config/redisClient.js'
import InitialSignUp from '../../domain/usecases/initiateUserSignUp.js';

const userRepository = new UserRepository();


const initiateRegistration = async(req,res)=>{
  //create a 4 digit otp. save user data temperarly in session
  const userData = req.body
  client.hSet('userData',userData)
  InitialSignUp(userData)
}



const signUp = async (req, res) => {
  const userSignUp = new UserSignUp(userRepository);
  try {
    const user = await userSignUp.execute(req.body);
    res.status(201).json({success:true});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body)
  const userLogin = new UserLogin(userRepository);
  try {
    const user = await userLogin.execute(req.body);
    console.log(user)
    res.status(200).json({success:true,user:user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signUp, login };