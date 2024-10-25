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
  phone:{type:String},
  isActive:{
    type:Boolean,
    default:true
  },
  originalImgURL:{
    type:String,
    required:true
  },
  originalImgPublicId:{
      type:String,
      required:true
  },
  croppedImgURL:{
      type:String,
      required:true
  },
  croppedImgPublicId:{
      type:String,
      required:true
  }
  
});

const UserModel = model('User', UserSchema);
export default UserModel;