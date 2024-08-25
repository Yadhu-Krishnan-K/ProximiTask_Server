import jwt from "../../utils/jwt.js";
import CustomError from "../../config/CustomError.js";
const refreshAccessToken = (req, res, next) => {
    console.log('Inside refreshing token');
    console.log('req.body from refreshtoken validating place ==== ', req.body)
    const {refreshToken, details} = req.body;

    console.log('refreshToken == ',refreshToken,'  details ==== ',details)
    
    if (!refreshToken) {
        return next(new CustomError('Refresh token is required', 400)); // Bad request if token is missing
    }

    const secret = process.env.REFRESH_TOKEN_SECRET;

    try {
        const verified = jwt.verifyToken(refreshToken, secret,details.role);
        // console.log('Token verification result:', verified);

        if (verified.success) {
            // console.log('Controller creates access token');
            const accessToken = jwt.generateAccessToken(details.email, details.role); // Assuming email is part of token payload
            // console.log('Generated Access Token:', accessToken);
            return res.json({ success: true, accessToken });
        } else {
            // return next(new CustomError('Invalid refresh token', 401)); // Unauthorized if token is invalid
            return res.json({success:false})
        }
    } catch (error) {
        // console.log('errror from refreshToken validation ======--------------------========================================-------------------------   ',error )
        next(new CustomError('Failed to refresh access token', 500)); // Internal server error if something goes wrong
    }
};

export { refreshAccessToken };
