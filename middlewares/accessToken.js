import CustomError from "../config/CustomError.js";
import jwt from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    // if (!accessToken && !refreshToken) {
    //     return next(); // No tokens, proceed without authentication
    // }

    let user = null;

    // verifyToken access token
    if (accessToken) {
        try {
            user = jwt.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = user;
            return next(); // Valid token, proceed
        } catch (error) {
            if (error.name !== "TokenExpiredError") {
                console.error("Invalid access token:", error);
                return res.status(401).json({ message: "Invalid token. Please log in again." });
            }
            // If token is expired, continue to check refresh token
        }
    }

    // If access token is expired, verifyToken refresh token
    if (refreshToken) {
        try {
            user = jwt.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            
            // Generate new access token
            const newAccessToken = jwt.generateAccessToken(user);

            // Set new access token in cookies
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV=="production",
                sameSite: "none",
            });

            req.user = user; // Attach user data
            return next();
        } catch (error) {
            console.error("Invalid refresh token:", error);
            return res.status(403).json({ message: "Session expired. Please log in again." });
        }
    }

    return next(); // No valid tokens, proceed without authentication
} catch (error) {
    console.error("Error in JWT middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
}
};

export default authMiddleware;