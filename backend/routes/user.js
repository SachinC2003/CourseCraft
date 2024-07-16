const {Router} = require("express")
const router = Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {User, Course} = require("../db/index")
const userMiddleware = require("../middleware/user")
const users = require("..");

router.post("/signup", async(req, res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(403).send({msg : "Invalide username and password"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await User.create({username : username, password : hashedPassword});
        return res.status(201).send({msg :"user created"});
    }catch(error){
        return res.status(500).send({msg :"user not created", erro: error});
    }
})

router.post("/signin", async(req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(403).send({msg : "All fields are required"});
    }

    try{
        const user = await User.findOne({username : username});
        if(!user){
            return res.status(403).send({msg : "User with given username not found"});
        }

        const ismatched = await bcrypt.compare(password, user.password);
        if(!ismatched){
            return res.status(403).send({msg : "Credential are not matched"});
        }

        const token = jwt.sign(
            {_id : user._id, username : username},
            process.env.JWT_KEY,
            {expiresIn : "1d"}
        );

        return res.status(201).send({token : token})
    }catch(error){
        console.log(error);
        return res.status(500).send({msg :"something erroe is encounter", error : error})
    }
    
})

router.get("/courses", userMiddleware, async(req, res)=>{
    try{
        const allcourses = await Course.find()
        return res.status(201).send({courses: allcourses})
    }catch(error){
        return res.status(500).send({msg : "error to fetching courses", error : error})
    }
})

router.post("/courses/:courseid", userMiddleware, async(req, res)=>{
    const courseid = req.params.courseid;
    if(!courseid){
        return res.status(403).send({msg: "course id not found"});
    }

    try{
        const course = await Course.findById(courseid)
        if(!course){
            return res.status(403).send({msg: "course with given id not found"});
        }

        const user = await User.findById(req.user._id)

        if(user.myCourses.include(course._id)){
            return res.status(403).send({msg: "course with given id exist"});
        }

        user.myCourses.push(course);
        user.save();
        return res.status(200).send({ message: "Course purchased successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Error fetching course" });
        }
})

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
      const user = await User.findById(req.user._id).populate("myCourses");
      return res.status(200).send({ purchasedCourses: user.myCourses });
    } catch (error) {
      return res.status(500).send({ message: "Error fetching courses" });
    }
  });

module.exports = router;