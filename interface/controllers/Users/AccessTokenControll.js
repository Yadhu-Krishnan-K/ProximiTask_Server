import jwt from 'jsonwebtoken'
import CustomError from "../../../config/CustomError.js";
import UserModel from '../../../infrastructure/db/userSchema.js';
const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(403).json({ message: 'No refresh token' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await UserModel.findById(decoded.userId);

        if (!user) return res.status(403).json({ message: 'User not found' });

        const { accessToken } = generateTokens(user);

        res.json({ accessToken, roles: user.roles });
    } catch (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

export { refreshAccessToken };
