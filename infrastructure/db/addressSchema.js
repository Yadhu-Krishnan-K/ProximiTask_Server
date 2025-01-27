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
  state:{
    type:String,
    required:true
  },
  pin:{
    type:Number,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  defaultAddress:{
    type:Boolean,
    default:false
  }
});

const AddressModel = model('address', AddressSchema);
export default AddressModel;