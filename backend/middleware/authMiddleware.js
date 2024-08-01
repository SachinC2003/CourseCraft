const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      console.log('Decoded user:', req.user); // Debugging line
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(403).json({ message: "Invalid token" });
    }
  }

  module.exports = authMiddleware;