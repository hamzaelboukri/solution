const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/server.config');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, access denied'
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Add user data to request
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};


module.exports = authMiddleware;