import mongoose, { Mongoose, Schema, model, trusted } from 'mongoose';
const AddressSchema = new Schema({
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
  },
  locationId:{
    type: mongoose.Schema.Types.ObjectId,
    Ref:"Location",
    required:false
  }
});

const AddressModel = model('Address', AddressSchema);
export default AddressModel;