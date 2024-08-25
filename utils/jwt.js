import jwt, { decode } from 'jsonwebtoken';
import CustomError from '../config/CustomError.js';
const { sign, verify } = jwt

const generateAccessToken = (email,role) => {
  const expiresIN = process.env.TOKEN_EXPIRATION
  return sign({email:email,role:role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIN });
};

const generateRefreshToken = (email) => {
  const expiresIN = process.env.REFRESH_TOKEN_EXPIRATION
  // console.log('email when creating token',email)
  return sign({email:email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: expiresIN });
};

const verifyToken = (token, secret,requiredRole) => {
  try {
    // console.log('verifying token...---')
    const decoded = verify(token, secret);
    // console.log('decoded = ',decoded)
    const expTime = new Date(decoded.exp * 1000)
    const success =  expTime > new Date();
    // console.log('success === ',success)
    if(requiredRole == decoded.role)return {success,email:decoded.email}
    throw new CustomError('Access Denined',409)
  } catch (error) {
    console.log('error from jwt ---====--=-=----00-===============================================--------  ',error)
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