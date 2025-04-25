import jwt, { decode } from 'jsonwebtoken';
import CustomError from '../config/CustomError.js';
const { sign, verify } = jwt

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, roles: user.roles }, // Include roles in payload
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  return accessToken
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  return refreshToken
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token,secret)
  } catch (error) {
    console.log('errror from verifying token = ',error)
    throw error
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