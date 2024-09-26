class Worker {
  constructor({
    name,
    email,
    area,
    category,
    phoneNumber,
    idCard,
    idCardNum,
    requestInitiated,
    active
  }) {
    this.name = name;
    this.email = email;
    this.area = area;
    this.category = category;
    this.phoneNumber = phoneNumber;
    this.idCard = idCard;
    this.idCardNum = idCardNum;
    this.requestInitiated = requestInitiated,
    this.active = active
  }
}

export default Worker
