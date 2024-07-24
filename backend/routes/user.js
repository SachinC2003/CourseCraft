const {Router} = require("express")
const router = Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {User, Admin, Course} = require("../db/index")
const userMiddleware = require("../middleware/user")
const users = require("..");

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ msg: 'Invalid username and password' });
    }
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).send({ msg: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
  
      // Generate a token
      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      return res.status(201).send({ msg: 'User created', token });
    } catch (error) {
      console.error('Error creating user:', error); // Log the error for debugging
      return res.status(500).send({ msg: 'User not created', error: error.message });
    }
  });

  router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).send({ msg: "All fields are required" });
    }
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send({ msg: "User with given username not found" });
      }
  
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(401).send({ msg: "Credentials do not match" });
      }
  
      const token = jwt.sign({ _id: user._id, username: username }, process.env.SECRET_KEY, { expiresIn: "1d" });
  
      return res.status(200).send({ token });
    } catch (error) {
      console.error('Signin error:', error);
      return res.status(500).send({ msg: "Something went wrong", error: error.message });
    }
  });
  
  

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

  router.post("/applay", async (req, res) => {
    console.log('Received request at /applay'); // Add this line
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(403).send({ msg: "username and password are required" });
    }
    try {
      const admin = await Admin.findOne({ username,password });
      if (admin) {
        return res.status(404).send({ msg: "admin with given username already exists" });
      }
      await Admin.create({ username, password });
      console.log('Admin created successfully'); // Add this line
      return res.status(201).send({ msg: "Applied for Admin successfully" });
    } catch (error) {
      console.error('Error in /applay route:', error); // Add this line
      return res.status(500).send({ msg: "Admin signup failed", error: error.message });
    }
});


module.exports = router;