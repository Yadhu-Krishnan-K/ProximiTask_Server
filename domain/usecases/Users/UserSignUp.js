import User from '../../entities/User.js';

class UserSignUp {
  constructor(userRepository) {
    this.userRepository = userRepository
  } 


  async execute(userDetails,userImgs) {
    try {
      const user = await this.userRepository.createUser(userDetails,userImgs);
      console.log('user = ',user)
      return new User(user);
    } catch (error) {
      throw error   
    }
  }
}

export default UserSignUp;
