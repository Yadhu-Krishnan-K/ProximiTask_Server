import { Schema, model } from "mongoose";

const locationSchema = new Schema({
    locationName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    loc:{
        lat:{
            type:Number,
            required:true
        },
        lng:{
            type:Number,
            required:true
        }
    }
    
})

const LocationModel = model('Location', locationSchema)

export default LocationModel