const {Admin} = require("../db/index")

async function AdminMiddleware (req, res, next) {
        const {username, password} = req.headers;

        if(!username || !password){
            return res.satus(403).send({msg: "Invalid username and pasaword"});
        }

        const admin = await Admin.findone({username : username, password : password});
        
        if(!admin){
            return res.status(403).send({msg : "Admin with given username and password not found"})
        }else{
            req.admin = admin;
            next()
        }
}

module.exports = AdminMiddleware;