const {User} = require("../db/index")

async function Usermiddleware(req, res, next){
    const {username, password} = req.headers;

    if(!username || !password){
        return req.status(403).send({msg : "Invalid username and pasaword"});
    }

    const user = await User.findone({username : username, password : password})

    if(!user){
        return res.staus(403).send({msg : "User with given username and password not found"})
    }else{
        req.user = User;
        next()
    }
}

module.exports = Usermiddleware;