const AdminMiddleware = async (req, res, next) => {
    console.log('req.user:', req.user);
    
    if (!req.user) {
        console.log('No user found in request');
        return res.status(403).send({msg: "Access denied. Not authenticated."});
    }
    
    if (req.user.role !== 'admin') {
        console.log(`User role is ${req.user.role}, not admin`);
        return res.status(403).send({msg: "Access denied. Admins only."});
    }
    
    console.log('Admin access granted');
    next();
};