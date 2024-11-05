class Location {
    constructor(coords, name, city, state, nation, pincode) {
      this.coords = coords; // { lat, long }
      this.name = name;
      this.city = city;
      this.state = state;
      this.nation = nation;
      this.pincode = pincode;
    }
  
    // Method to get a formatted address string
    getFormattedAddress() {
      return `${this.name}, ${this.city}, ${this.state}, ${this.nation}, ${this.pincode}`;
    }
  
    // Method to check if the location is within a given state
    isInState(state) {
      return this.state.toLowerCase() === state.toLowerCase();
    }
  
    // Static method to create a Location instance from a raw object
    static fromData(data) {
      return new Location(
        data.coords,
        data.name,
        data.city,
        data.state,
        data.nation,
        data.pincode
      );
    }
  }
  
export default Location  