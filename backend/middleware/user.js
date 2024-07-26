const { User } = require("../db/index"); // Adjust the path as necessary

async function Usermiddleware(req, res, next) {
    const userId = req.headers.userid;
    console.log('Received userId in middleware:', userId);

    if (!userId) {
        return res.status(403).send({ msg: "User ID is required" });
    }

    try {
        const user = await User.findById(userId);
        console.log('Found user:', user);

        if (!user) {
            return res.status(403).send({ msg: "User not found" });
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        console.error('Error in Usermiddleware:', error);
        return res.status(500).send({ msg: "Internal server error" });
    }
}

module.exports = Usermiddleware;