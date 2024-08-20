import jwt from "../utils/jwt.js";

const authMiddleware = (requiredRole) =>{
  return (req, res, next) => {
    const accessTokens = JSON.parse(req.headers["accessTokens"])
    // const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    // console.log('token = ',token)
    if (accessTokens.length) {
      console.log('token not found')
      return res.sendStatus(403); // Unauthorized
    }
  
    const verified = jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET,requiredRole)
    if(verified.success){
      next()
    }else{
      return res.sendStatus(401).json({role:requiredRole})
    }
  
  };
}

export default authMiddleware;
