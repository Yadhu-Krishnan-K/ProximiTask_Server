class User {
    constructor({ _id, name, googleId, email, isActive, originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL,roles }) {
      this._id = _id;
      this.name = name;
      this.googleId = googleId;
      this.email = email;
      this.googleLogin = false
      this.isActive = isActive
      this.originalImgPublicId = originalImgPublicId
      this.originalImgURL = originalImgURL
      this.croppedImgPublicId =croppedImgPublicId
      this.croppedImgURL = croppedImgURL;
      this.roles = roles
    }
  }
  
  export default User;