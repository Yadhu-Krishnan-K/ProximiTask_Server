import { Schema, model, trusted } from 'mongoose';
const UserSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  googleId:{
    type:String
  },
  email: {
    type:String,
    required:true
  },
  pass: {
    type:String,
    required:true
  },
  isActive:{
    type:Boolean,
    default:true
  }
  
});

const UserModel = model('User', UserSchema);
export default UserModel;