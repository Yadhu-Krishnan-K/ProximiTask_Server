import jwt from 'jsonwebtoken';
const { sign, verify } = jwt

const generateAccessToken = (email) => {
  return sign({email:email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
};

const generateRefreshToken = (email) => {
  console.log('email when creating token',email)
  return sign({email:email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
};

const verifyToken = (token, secret) => {
  try {
    const decoded = verify(token, secret);
    console.log('decoded = ',decoded)
    const expTime = new Date(decoded.exp * 1000)
    const success =  expTime > new Date();
    return {success,email:decoded.email}
  } catch (error) {
    return {success:false}
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};