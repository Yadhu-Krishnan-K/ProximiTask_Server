import UserModel from '../../infrastructure/db/userSchema.js';
import User from '../../domain/entities/User.js';

class UserRepository {
  async createUser(userDetails) {
    console.log('details = ', userDetails)
    const data = JSON.parse(userDetails)
    const user = new UserModel(data)
    console.log('user = ',user)
    await user.save(); 
    return user
  }

  async findUserByEmail(email) {
    const user =await UserModel.findOne({ email });
    if(user){
       return new User(user.toObject());
    }
    return null
  }

  async findAllUsers(){
    const usersList = await UserModel.find()
    return usersList
  }

  async updateUserStatus(user_id) {
    try {
      const user = await UserModel.findById(user_id);
      if (!user) {
        throw new Error('User not found');
      }
      
      const updatedUser = await UserModel.findByIdAndUpdate(
        user_id,
        { isActive: !user.isActive },
        { new: true }  // Return the updated document
      );
      
      return new User(updatedUser.toObject());
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }
  
}

export default UserRepository;