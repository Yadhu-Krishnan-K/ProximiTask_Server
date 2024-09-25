class User {
    constructor({ name, googleId, email, isActive, originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL }) {
      // this.id = id;
      this.username = name;
      this.googleId = googleId;
      this.email = email;
      this.googleLogin = false
      this.isActive = isActive
      this.originalImgPublicId = originalImgPublicId
      this.originalImgURL = originalImgURL
      this.croppedImgPublicId =croppedImgPublicId
      this.croppedImgURL = croppedImgURL
    }

    googleLI(){
      this.googleLogin = true
    }
    googleLO(){
      this.googleLogin = false
    }

  }
  
  export default User;