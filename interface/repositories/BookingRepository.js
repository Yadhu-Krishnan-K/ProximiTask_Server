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
            throw error
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
            throw error
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
            throw error
        }
    }
    async getBookedDates(id){
        try {
            const list = await Booking.find({workerId:id},{_id:0,selectedDate:1})
            return list
        } catch (error) {
            throw error
        }
    }

}

export default BookingRepository