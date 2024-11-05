import { Schema, model } from "mongoose";

const locationSchema = new Schema({
    coords: {
        lat: {
          type: Number,
          required: true
        },
        long: {
          type: Number,
          required: true
        }
      },
      name: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
        required: true
      },
      nation: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
      }
    
})

const LocationModel = model('Location', locationSchema)

export default LocationModel