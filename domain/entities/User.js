class User {
    constructor({ name, googleId, email, pass, isActive }) {
      // this.id = id;
      this.username = name;
      this.googleId = googleId;
      this.email = email;
      this.password = pass;
      this.googleLogin = false
      this.isActive = isActive
    }

    googleLI(){
      this.googleLogin = true
    }
    googleLO(){
      this.googleLogin = false
    }

  }
  
  export default User;