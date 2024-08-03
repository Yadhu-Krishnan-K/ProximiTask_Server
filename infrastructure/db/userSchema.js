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
  pass: {
    type:String,
    required:true
  },
  
});

const UserModel = model('User', UserSchema);
export default UserModel;