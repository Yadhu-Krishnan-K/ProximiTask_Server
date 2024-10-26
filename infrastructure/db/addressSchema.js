import mongoose, { Schema, model, trusted } from 'mongoose';
const AddressSchema = new Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  state:{
    type:String,
    required:true
  },
  dist:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  }
});

const AddressModel = model('address', AddressSchema);
export default AddressModel;