const {Router} = require("express")
const router = Router();
/*const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")*/

const {Teacher, Course} = require("../db/index");
const teacherMiddleware = require("../middleware/teacher")


router.get("/courses", teacherMiddleware, async(req, res)=>{
    try{
        const allcourses = await Course.find()
        return res.status(201).send({courses: allcourses})
    }catch(error){
        return res.status(500).send({msg : "error to fetching courses", error : error})
    }
})

router.post("/aplodcourse", teacherMiddleware, async(req, res) =>{
    const {title, description, price, owner, image} = req.body
    if(!title || !description || !price || !owner || !image){
        return res.status(403).send({msg : "Incomplete info of course"});
    }

    try{
        const teacher = await Teacher.findById(req.Teacher._id);
        const course = await Course.create({
            title : title,
            description : description,
            price : price,
            image : image,
            owner : owner,
        })

        teacher.courses.push(course._id);
        await teacher.save();
        return res.status(201).send({msg : "Course created succsessfully"});
    }catch(error){
        return res.status(500).send({msg : "Course not created", error : error});
    }
})

router.get("/mycourses", teacherMiddleware, async(req, res) =>{
    try{
        const teacher = await Teacher.findById(req.teacher._id).populate("courses")
        return res.status(201).send({courses : teacher.courses})
    }catch(error){
        return res.status(500).send({msg :"Error in fetching courses"})
    }
})

module.exports = router;