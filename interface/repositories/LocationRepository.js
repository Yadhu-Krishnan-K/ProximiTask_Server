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
            throw error
        }

    }
    async getLocations(){
        const locationList = await LocationModel.find()
        return locationList
    }
    async deleteLocation(id){
        await LocationModel.findByIdAndDelete(id)
    }

}

export default LocationRepository