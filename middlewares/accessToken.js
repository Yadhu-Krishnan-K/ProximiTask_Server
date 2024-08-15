import jwt from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  // console.log('inside auth');
  // console.log(req.headers)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  // console.log('token = ',token)
  if (!token) {
    console.log('token not found')
    return res.sendStatus(403); // Unauthorized
  }

  const verified = jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
  if(verified.success){
    next()
  }else{
    return res.sendStatus(401)
  }

};

export default authMiddleware;
