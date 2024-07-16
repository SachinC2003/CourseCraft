const {Router} = require("express")
const router = Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {Admin, Course} = require("../db/index");
const adminMiddleware = require("../middleware/admin")
const users = require("..");

/*router.post("/signup", async(req, res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(403).send({msg : "Invalide username and password"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await Admin.create({username, hashedPassword});
        return res.status(201).send({msg : "Admin signup succsessfully"});
    }catch(error){
        return res.status(500).send({msg : "Admin not signup succsessfully", error : error});
    }
})*/
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Validate request data using zAdminSchema
      zAdminSchema.parse({ username, password });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({ username, password: hashedPassword });
      return res.status(201).send({ msg: "Admin signed up successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        return res.status(400).send({ msg: "Invalid input data", errors: error.errors });
      } else {
        return res.status(500).send({ msg: "Admin signup failed", error: error });
      }
    }
  });

router.post("/signin", async(req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(403).send({msg : "All fields are required"});
    }

    try{
        const admin = await Admin.findOne({username : username});
        if(!admin){
            return res.status(403).send({msg : "Admin with given username not found"});
        }

        const ismatched = await bcrypt.compare(password, admin.password);
        if(!ismatched){
            return res.status(403).send({msg : "Credential are not matched"});
        }

        const token = jwt.sign(
            {_id : admin._id, username : username},
            process.env.JWT_KEY,
            {expiresIn : "1d"}
        );

        return res.status(201).send({token : token})
    }catch(error){
        return res.status(500).send({msg :"something erroe is encounter", error : error})
    }
    
})

router.post("/courses", adminMiddleware, async(req, res) =>{
    const {title, description, price, owner, image} = req.body
    if(!title || !description || !price || !owner || !image){
        return res.status(403).send({msg : "Incomplete info of course"});
    }

    try{
        const admin = await Admin.findById(req.Admin._id);
        const course = await Course.create({
            title : title,
            description : description,
            price : price,
            image : image,
            owner : owner,
        })

        admin.courses.push(course._id);
        await admin.save();
        return res.status(201).send({msg : "Course created succsessfully"});
    }catch(error){
        return res.status(500).send({msg : "Course not created", error : error});
    }
})

router.get("/courses", adminMiddleware, async(req, res) =>{
    try{
        const admin = await Admin.findById(req.admin._id).populate("courses")
        return res.status(201).send({courses : admin.courses})
    }catch(error){
        return res.status(500).send({msg :"Error in fetching courses"})
    }
})

module.exports = router;