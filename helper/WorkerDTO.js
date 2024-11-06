class WorkerDto{
    constructor({
        _id,
        name,
        email,
        location_id,
        category_id,
        phoneNumber,
        idCard,
        idCardNum,
        requestInitiated,
        active,
        role,
        originalImgURL,
        originalImgPublicId,
        croppedImgURL,
        croppedImgPublicId,
        leaveDays
    }
    ){
    this._id = _id
    this.name = name
    this.email = email
    this.location_id = location_id
    this.category_id = category_id
    this.phoneNumber = phoneNumber    
    this.idCard = idCard    
    this.idCardNum = idCardNum    
    this.requestInitiated = requestInitiated    
    this.active = active    
    this.role = role    
    this.originalImgURL = originalImgURL    
    this.originalImgPublicId = originalImgPublicId    
    this.croppedImgURL = croppedImgURL    
    this.croppedImgPublicId = croppedImgPublicId
    this.leaveDays = leaveDays
    }
}

export default WorkerDto