import Booking from "../../infrastructure/db/bookingSchema.js";
class BookingRepository{
    async createBooking(data){
        try {
            const booking = new Booking(data)
            const x = await booking.save()
            return x
        } catch (error) {
            console.log('errror from createBooking from booking reppo = ',error)
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
            
            
            return data
        } catch (error) {
            console.log('errror from getListFromWorker from booking reppo = ',error)
        }
    }

}

export default BookingRepository