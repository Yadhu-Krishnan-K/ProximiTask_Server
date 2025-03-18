import mongoose, { Schema, model, trusted } from 'mongoose';
const UserSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  email: {
    type:String,
    unique:true,
    required:true
  },
  role:{
    type: [String], // Array of roles
    enum: ['user', 'admin', 'worker'], // Restrict role values
    default: ['user'],
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
    default:""
  },
  originalImgPublicId:{
      type:String,
      default:""
  },
  croppedImgURL:{
      type:String,
      default:""
  },
  croppedImgPublicId:{
      type:String,
      default:""
  },
  address:{
    type:mongoose.Schema.Types.ObjectId,
    Ref:'Address'
  }
});

const UserModel = model('User', UserSchema);
export default UserModel;