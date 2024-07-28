const TeacherMiddleware = async (req, res, next) => {
    console.log('req.user:', req.user);
    
    if (!req.user) {
        console.log('No user found in request');
        return res.status(403).send({msg: "Access denied. Not authenticated."});
    }
    
    if (req.user.role !== 'teacher') {
        console.log(`User role is ${req.user.role}, not teacher`);
        return res.status(403).send({msg: "Access denied. Teacher only."});
    }
    
    console.log('Teacher access granted');
    next();
};

module.exports = TeacherMiddleware;