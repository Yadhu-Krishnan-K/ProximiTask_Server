import CustomError from "../../config/CustomError.js"
import LocationModel from "../../infrastructure/db/locationManageSchema.js"

class LocationRepository{
    async addLocation(details){
        try {
            const newLocation = new LocationModel({
                locationName: details.name,
                address:details.address,
                loc:{
                    lat:details.lat,
                    lng:details.lng
                }
            })
            const location = await newLocation.save()
            return location.toObject()
            
        } catch (error) {
            console.log("addLocation -- == ",error)
            throw new CustomError('Internal Server Error',500)
        }

    }
    async getLocations(){
        try {
            const locationList = await LocationModel.find()
            return locationList
        } catch (error) {
            console.log('getLocations --== ',error)
            throw new CustomError('Internal Server Error',500)
        }
    }
    async deleteLocation(id){
        try {
            await LocationModel.findByIdAndDelete(id)
        } catch (error) {
            console.log('deleteLocation -=',error);
            throw new CustomError('Internal Server Error',500)
        }
    }

}

export default LocationRepository