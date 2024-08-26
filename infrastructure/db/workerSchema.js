import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema({
    name:String,
    email:String,
    password:String,
    area:String,
    lat:String,
    long:String,
    category:String,
    phoneNumber:String,
    idCard:String,
    idCardNum:String,
    requestInitiated:Boolean,
    active:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'worker'
    }
})

const WorkerModel = mongoose.model('Worker',workerSchema);

export default WorkerModel;