import jwt from "../../utils/jwt.js";
import CustomError from "../../config/CustomError.js";
const refreshAccessToken = (req, res, next) => {
    console.log('Inside refreshing token');
    const refreshToken = req.body.refreshToken;
    
    if (!refreshToken) {
        return next(new CustomError('Refresh token is required', 400)); // Bad request if token is missing
    }

    const secret = process.env.REFRESH_TOKEN_SECRET;

    try {
        const verified = jwt.verifyToken(refreshToken, secret);
        console.log('Token verification result:', verified);

        if (verified.success) {
            console.log('Controller creates access token');
            const accessToken = jwt.generateAccessToken(verified.email); // Assuming email is part of token payload
            console.log('Generated Access Token:', accessToken);
            return res.json({ success: true, accessToken });
        } else {
            return next(new CustomError('Invalid refresh token', 401)); // Unauthorized if token is invalid
        }
    } catch (error) {
        next(new CustomError('Failed to refresh access token', 500)); // Internal server error if something goes wrong
    }
};

export { refreshAccessToken };
