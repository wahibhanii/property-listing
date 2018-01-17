class Location {
  constructor (input) {
    this.lat = input.lat || null;
    this.lng = input.lng || null;
    this.country = input.country || null;
    this.state = input.state || null;
    this.city = input.city || null;
    this.address = input.address || null;
    this.zipcode = input.zipcode || null;
  }

  
}

module.exports = Location;