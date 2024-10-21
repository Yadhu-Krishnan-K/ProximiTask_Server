import CustomError from "../../config/CustomError.js";
import Booking from "../../infrastructure/db/bookingSchema.js";
import UserModel from "../../infrastructure/db/userSchema.js";
class BookingRepository{
    async createBooking(data){
        try {
            const booking = new Booking(data)
            const x = await booking.save()
            return x
        } catch (error) {
            console.log('errror from createBooking from booking reppo = ',error)
            throw new CustomError('Internal Server Error',500)
        }
    }
    async getBookingsByUser(id){
        try {
            const data = await Booking.aggregate(
                [
                    {
                        $match:{ userId:id }
                    }
                ]
            )

            
            return data
        } catch (error) {
            console.log('errror from getBookingsByUser from booking reppo = ',error)
            throw new CustomError('Internal Server Error',500)
        }
    }
    async getListFromWorker(id){
        try {
            const data = await Booking.aggregate(
                [
                    {
                        $match:{ workerId:id }
                    }
                ]
            )

            for(let details of data){
                let user = await UserModel.findOne({_id:details.userId})

                details.userName = user.name
            }
            console.log('from repo = ',data)
            
            return data
        } catch (error) {
            console.log('errror from getListFromWorker from booking reppo = ',error)
            throw new CustomError('Internal Server Error',500)
        }
    }

}

export default BookingRepository