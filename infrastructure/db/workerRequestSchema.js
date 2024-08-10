import { Schema, model } from "mongoose";

const requestSchema = new Schema({
    
})

const RequestModel = model('request',requestSchema)

export default RequestModel;