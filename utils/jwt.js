import jwt, { decode } from 'jsonwebtoken';
import CustomError from '../config/CustomError.js';
const { sign, verify } = jwt

const generateAccessToken = (email,role) => {
  console.log('email = ',email, ' role = ',role)
  const expiresIN = process.env.TOKEN_EXPIRATION
  let accessToken = sign({email:email,role:role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIN });
  console.log('accessToken after generating = ',accessToken)
  return accessToken
};

const generateRefreshToken = (email) => {
  const expiresIN = process.env.REFRESH_TOKEN_EXPIRATION
  const secret = process.env.REFRESH_TOKEN_SECRET;
  console.log('secret = ',secret)
  let refreshToken = sign({email:email}, secret, { expiresIn: expiresIN });
  return refreshToken
};

const verifyToken = (token, secret,requiredRole) => {
  try {
    console.log('access token ...---',token)
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
const verifyRefreshToken = (token,secret) => {
  try {
    console.log('refresh token from VerifyRefreshToken = ',token)
    console.log('secret = ',secret)
    const decoded = verify(token, secret);
    console.log('decoded = ',decoded)
    const expTime = new Date(decoded.exp * 1000)
    const success =  expTime > new Date();
    return {success}
  } catch (error) {
    console.log('error from jwt verifying token ---====--=-=----00-===============================================--------  ',error)
    return {success:false}
  }
}

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
  verifyRefreshToken,
  decoded
};