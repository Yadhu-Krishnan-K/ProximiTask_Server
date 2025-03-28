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
  roles:{
    type: [String], // Array of roles
    enum: ['user', 'admin', 'worker'], // Restrict role values
    default: ['user'],
  },
  password: {
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
    default:"data:image/png;base64,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"
  },
  originalImgPublicId:{
      type:String,
      default:""
  },
  croppedImgURL:{
      type:String,
      default:"data:image/png;base64,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"
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