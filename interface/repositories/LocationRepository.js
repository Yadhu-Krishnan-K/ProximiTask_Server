import CustomError from "../../config/CustomError.js"
import LocationModel from "../../infrastructure/db/locationManageSchema.js"

class LocationRepository{
    async addLocation(details){
        console.log('detalis from location repo = ',details)
        const data = JSON.parse(details)
        try {
            const newLocation = new LocationModel({
                coords: {
                    lat: data.coords.lat,
                    long: data.coords.long,
                },
                name: data.name,
                city: data.city,
                state: data.state,
                nation: data.nation,
                pincode: data.pincode
            })
            const location = await newLocation.save()
            return location._id
            
        } catch (error) {
            console.log("addLocation -- == ",error)
            throw error
        }

    }
    async getLocations(){
        try {
            const locationList = await LocationModel.find()
            return locationList
        } catch (error) {
            console.log('getLocations --== ',error)
            throw error
        }
    }
    async deleteLocation(id){
        try {
            await LocationModel.findByIdAndDelete(id)
        } catch (error) {
            console.log('deleteLocation -=',error);
            throw error
        }
    }

}

export default LocationRepository