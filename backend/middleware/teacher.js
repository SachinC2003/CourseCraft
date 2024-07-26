const {Admin} = require("../db/index")

async function TeacherMiddleware (req, res, next){
    if(req.user.role != 'teacher')
    {
        return res.status(403).send({msg: "Access denied. Teacher only."})
    }

    next();
}

module.exports =  TeacherMiddleware;