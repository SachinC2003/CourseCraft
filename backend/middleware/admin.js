const {Admin} = require("../db/index")

async function AdminMiddleware (req, res, next){
    if(req.user.role != 'admin')
    {
        return res.status(403).send({msg: "Access denied. Admins only."})
    }

    next();
}

module.exports =  AdminMiddleware;