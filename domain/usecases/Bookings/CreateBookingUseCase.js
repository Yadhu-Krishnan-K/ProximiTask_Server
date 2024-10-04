import Booking from "../../entities/Booking.js"

class CreateBookingUseCase{
    constructor(repository){
        this.repository = repository
    }

    async execute(data){
        try {
            const booking = new Booking(data)
            const storedBooking = await this.repository.createBooking(booking)
            return storedBooking
        } catch (error) {
            throw error
        }
    }
}

export default CreateBookingUseCase