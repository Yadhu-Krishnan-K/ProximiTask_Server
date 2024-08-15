import CustomError from '../../../config/CustomError.js';
import { comparePass } from '../../../utils/comparePass.js';

class UserLogin {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, pass }) {
    const user = await this.userRepository.findUserByEmail(email);
    console.log(user)
    if (user) {
      if(comparePass(pass,user.password)){
        return user;
      }else{
        throw new CustomError('Invalid password',401)
      }
    }else{
      throw new CustomError('Invalid User',401)
    }
    throw new CustomError('Invalid credentials', 401);
  }
}

export default UserLogin;