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
      throw error
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
      throw new CustomError('invalid email', 404);
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      throw error
    }
  }

  async findUserWhenRegister(email){
    try {
        const user = await UserModel.findOne({ email});
        console.log('user data from repo = ',user)
        return user

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findAllUsers(page, limit) {
    try {
      const skip = (page - 1) * limit; // Calculate the number of documents to skip
      const usersList = await UserModel.find().skip(skip).limit(limit);
      return usersList;
    } catch (error) {
      console.error('Error finding all users:', error.message);
      throw error; // Rethrow error for the controller to handle
    }
  }

  async countUsers() {
    try {
      const totalUsers = await UserModel.countDocuments();
      return totalUsers;
    } catch (error) {
      console.error('Error counting users:', error.message);
      throw error; // Rethrow error for the controller to handle
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
      throw error;
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
