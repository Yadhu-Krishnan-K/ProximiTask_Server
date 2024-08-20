import { Schema, model, trusted } from 'mongoose';
const UserSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  role:{
    type:String,
    default:'user'
  },
  googleLogin:{
    type:Boolean,
    default:false
  },
  pass: {
    type:String,
    // required:true
  },
  isActive:{
    type:Boolean,
    default:true
  }
  
});

const UserModel = model('User', UserSchema);
export default UserModel;