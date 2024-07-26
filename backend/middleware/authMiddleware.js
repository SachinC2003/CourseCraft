function authMiddleware(req, res, next) {
    console.log('Auth middleware called');
    console.log('Request headers:', req.headers);
  
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log('Decoded token:', decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(403).json({ message: "Invalid token" });
    }
  }