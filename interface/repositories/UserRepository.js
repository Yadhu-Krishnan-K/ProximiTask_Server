import UserModel from '../../infrastructure/db/userSchema.js';
// import User from '../../domain/entities/User.js';
import CustomError from '../../config/CustomError.js';
import { comparePass } from '../../utils/comparePass.js';
import bcrypt from "bcryptjs";


class UserRepository {
  async createUser(userDetails,userImgs) {
    try {
      const data = Object.assign({},userDetails,userImgs);
      data.role = 'user'
      const user = new UserModel(data);
      await user.save();
      return user;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new CustomError('Internal Server Error', 500);  // Internal Server Error
    }
  }

  

  async findUserByEmail(email) {
    try {
      console.log('email from findUserByEmail = ',email);
      
      const user = await UserModel.findOne({ email});
      console.log('user data from repo = ',user)
      if (user) {
        return user
      }
      throw new CustomError('invalid email', 500);
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      throw new CustomError('Failed to find user by email', 500);
    }
  }

  async findUserWhenRegister(email){
    try {
        const user = await UserModel.findOne({ email});
        console.log('user data from repo = ',user)
        return user

    } catch (error) {
      console.log(error)
    }
  }

  async findAllUsers() {
    try {
      const usersList = await UserModel.find();
      return usersList;
    } catch (error) {
      console.error('Error finding all users:', error.message);
      throw new CustomError('Failed to retrieve users list', 500);
    }
  }

  async updateUserStatus(user_id) {
    try {
      const user = await UserModel.findById(user_id);
      if (!user) {
        throw new CustomError('User not found', 404);  // Not Found
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        user_id,
        { isActive: !user.isActive },
        { new: true } // Return the updated document
      );

      return updatedUser.toObject();
    } catch (error) {
      console.error('Error updating user status:', error.message);
      throw new CustomError('Failed to update user status', 40463);
    }
  }
  async checkPass(password,email){
    try {
      const user = await UserModel.findOne({email})
      if(user){
        let res = await comparePass(password,user.pass)
        if(res){
          return {success:true}
        }
        else{
          return {success:false}
        }
      }else{
        return {success:false}
      }
    } catch (error) {
      throw error
    }
  }
  async changePass(email,pass){
    try {
      const hash = await bcrypt.hash(pass, 10)
      const user = await UserModel.findOneAndUpdate({email},{pass:hash},{new:true})
      
    } catch (error) {
      throw error
    }
  }

  // async logOut()
}

export default UserRepository;
