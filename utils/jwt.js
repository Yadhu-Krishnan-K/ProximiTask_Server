import jwt, { decode } from 'jsonwebtoken';
import CustomError from '../config/CustomError.js';
const { sign, verify } = jwt

const generateAccessToken = (email,role) => {
  return sign({email:email,role:role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
};

const generateRefreshToken = (email) => {
  console.log('email when creating token',email)
  return sign({email:email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
};

const verifyToken = (token, secret,requiredRole) => {
  try {
    const decoded = verify(token, secret);
    console.log('decoded = ',decoded)
    const expTime = new Date(decoded.exp * 1000)
    const success =  expTime > new Date();
    if(requiredRole == decoded.role)return {success,email:decoded.email}
    throw new CustomError('Access Denined',409)
  } catch (error) {
    return {success:false}
  }
};

const decoded = (token)=>{
  try {
    const tokenInfo = decode(token)
    return tokenInfo
  } catch (error) {
    return new CustomError(error.messsage,error.status)
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  decoded
};