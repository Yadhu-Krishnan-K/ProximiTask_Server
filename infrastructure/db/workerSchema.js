import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema({
    name:String,
    email:String,
    password:String,
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Refers to the Location model
        required:true
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    idCard:String,
    idCardNum:{
        type:String,
        required:true,
        unique:true
    },
    requestInitiated:Boolean,
    active:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'worker'
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
    },
    leaveDays:[String]
})

const WorkerModel = mongoose.model('Worker',workerSchema);

export default WorkerModel;