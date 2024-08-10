import jwt from "../../utils/jwt.js"

const refreshAccessToken = (req,res) => {
    console.log('inside refreshing token-----------___________________--------------========')
    const refreshToken = req.body.refreshToken
    const secret = process.env.REFRESH_TOKEN_SECRET
    const verified = jwt.verifyToken(refreshToken,secret)
    console.log('token verification',verified)
    if(verified.success){
        console.log('Controller create acceess Token')
        //decoded.email
        const accessToken = jwt.generateAccessToken(verified.email)
        console.log(accessToken)
        return res.json({success:true,accessToken})
    }else{
        return res.json({success:false})
    }
}
export {refreshAccessToken}