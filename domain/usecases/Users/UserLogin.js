import CustomError from '../../../config/CustomError.js';
import { comparePass } from '../../../utils/comparePass.js';

class UserLogin {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, pass }) {
    console.log('email = ',email,', pass = ',pass)
    const user = await this.userRepository.findUserByEmail(email);
    console.log(user)
    if (user) {
      if(!user.isActive) throw new CustomError('User has no access',403)
        const res = await comparePass(pass,user.password)
        console.log('comparePass res = ',res)
      if(res){
        return user;
      }else{
        throw new CustomError('Invalid password',401)
      }
    }else{
      throw new CustomError('Invalid User',401)
    }
    // throw new CustomError('Invalid credentials', 401);
  }
}

export default UserLogin;