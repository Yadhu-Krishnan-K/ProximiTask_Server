import CustomError from "../config/CustomError.js";
import jwt from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded; // Attach decoded user info (userId, roles) to req
      next(); // Proceed to the next middleware/controller
  } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired access token' });
  }
};

export default authMiddleware;
