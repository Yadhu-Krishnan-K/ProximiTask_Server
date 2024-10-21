import CustomError from "../config/CustomError.js";
import jwt from "../utils/jwt.js";

const authMiddleware = (requiredRole) =>{
  return (req, res, next) => {
    try {
      console.log('authenticating the role ----');
      console.log('req.headers.accesstokens = ',req.headers["access-tokens"])
      // console.log('headers from request = ',req.headers)
      const tokens = JSON.parse(req.headers["access-tokens"])
      // const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
      // console.log('token = ',token)
      console.log('accessTokens = ',tokens);
      
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
      console.log('token = ',token)
      const AccessSecret = process.env.ACCESS_TOKEN_SECRET
      const verified = jwt.verifyToken(token, AccessSecret,requiredRole)
      console.log('token verification = ',verified)
      if(verified.success){
        next()
      }else{
        console.log('token expired..... returning response....--- there will be another request to refresh access token0-------')
        return res.status(401).json({role:requiredRole})
      }
    } catch (error) {
      console.log('error from accss token == ',error)
      next(error)
    }
  
  };
}

export default authMiddleware;
