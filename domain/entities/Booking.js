// src/core/entities/Booking.js
class Booking {
    constructor({ location, selectedDate, selectedTime, additionalNotes, workerId,userId }) {
      this.location = location;
      this.selectedDate = selectedDate;
      this.selectedTime = selectedTime;
      this.additionalNotes = additionalNotes;
      this.workerId = workerId;
      this.userId = userId
    }
  }
  
export default Booking
  