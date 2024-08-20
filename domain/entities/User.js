class User {
    constructor({ name, googleId, email, pass }) {
      // this.id = id;
      this.username = name;
      this.googleId = googleId;
      this.email = email;
      this.password = pass;
      this.googleLogin = false
    }

    googleLI(){
      this.googleLogin = true
    }
    googleLO(){
      this.googleLogin = false
    }

  }
  
  export default User;