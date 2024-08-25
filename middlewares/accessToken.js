import CustomError from "../config/CustomError.js";
import jwt from "../utils/jwt.js";

const authMiddleware = (requiredRole) =>{
  return (req, res, next) => {
    try {
      // console.log('headers from request = ',req.headers)
      const tokens = JSON.parse(req.headers["access-tokens"])
      // const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
      // console.log('token = ',token)

      if (tokens.length==0) {
        // console.log('token not found')
        throw new CustomError('login again',403); // Unauthorized
      }
      let token
      for(let i=0;i<tokens.length;i++){
        const decoded = jwt.decoded(tokens[i])
        if(decoded.role == requiredRole){
          token = tokens[i]
        }
      }
    
      const verified = jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET,requiredRole)
      if(verified.success){
        next()
      }else{
        return res.status(401).json({role:requiredRole})
      }
    } catch (error) {
      console.log('error from accss token == ',error)
      next(error)
    }
  
  };
}

export default authMiddleware;
