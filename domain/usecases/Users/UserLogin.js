import CustomError from '../../../config/CustomError.js';
import { comparePass } from '../../../utils/comparePass.js';
import UserDTO from '../../entities/User.js';

class UserLogin {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, pass }) {
    try {
      
      console.log('email = ',email,', pass = ',pass)
      const user = await this.userRepository.findUserByEmail(email);
      console.log(user)
      if (user) {
        if(!user.isActive) throw new CustomError('User has no access',403)
          const res = await comparePass(pass,user.password)
        console.log('comparePass res = ',res)
        if(res){
          return new UserDTO(user.toObject());
        }else{
          throw  CustomError.unauthorized('Invalid password')
        }
      }
      // throw new CustomError('Invalid credentials', 401);
    } catch (error) {
      throw error
    }
  }
}

export default UserLogin;