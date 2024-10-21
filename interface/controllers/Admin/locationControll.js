import LocationRepository from "../../repositories/LocationRepository.js"
import AddLocation from "../../../domain/usecases/Location/AddLocationUseCase.js"

const locationRepository = new LocationRepository()

const addLocation = async(req,res,next) => {
    console.log('req.body from addLocartion == = ',req.body)
    try {
        const location = new AddLocation(locationRepository).execute(req.body)
        res.status(201).json({success:true})
    } catch (error) {
        console.log(error)
        console.dir(error)
        next(error)
    }
}

const getLocations = async(req,res,next) => {
    try {
        console.log('here get location')
        const data = await locationRepository.getLocations()
        let locData = []
        console.log('getLocation data == ',data)
        for(let i=0;i<data.length;i++){
            let obj = {
                _id:data[i]._id,
                name:data[i].locationName,
                address:data[i].address,
                lat:data[i].loc?.lat,
                lng:data[i].loc?.lng
            }
            locData.push(obj)
        }
        console.log('getLocation locData == ',locData)

        res.json({success:true,placeData:locData})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteLocation = async(req,res,next) => {
    try {
        console.log('reached delete location....')
        const locationId = req.params.id
        console.log('locId=',locationId);
        await locationRepository.deleteLocation(locationId)
        res.json({success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export {
    addLocation,getLocations,deleteLocation
}