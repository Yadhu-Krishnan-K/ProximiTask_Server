import UserModel from '../../infrastructure/db/userSchema.js';
import User from '../../domain/entities/User.js';
import CustomError from '../../config/CustomError.js';

class UserRepository {
  async createUser(userDetails) {
    try {
      const data = JSON.parse(userDetails);
      data.role = 'user'
      const user = new UserModel(data);
      await user.save();
      return user;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new CustomError('Failed to create user', 500);  // Internal Server Error
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return new User(user.toObject());
      }
      return null;
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      throw new CustomError('Failed to find user by email', 500);
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

      return new User(updatedUser.toObject());
    } catch (error) {
      console.error('Error updating user status:', error.message);
      throw new CustomError('Failed to update user status', 500);
    }
  }

  // async logOut()
}

export default UserRepository;
