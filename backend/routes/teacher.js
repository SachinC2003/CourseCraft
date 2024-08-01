const {Router} = require("express")
const router = Router();
const mongoose = require('mongoose');
/*const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")*/

const {Teacher, Course} = require("../db/index");
const teacherMiddleware = require("../middleware/teacher")
const authMiddleware = require("../middleware/authMiddleware")


router.get("/courses", teacherMiddleware, async(req, res)=>{
    try{
        const allcourses = await Course.find()
        return res.status(201).send({courses: allcourses})
    }catch(error){
        return res.status(500).send({msg : "error to fetching courses", error : error})
    }
})

router.post("/aplodcourse", authMiddleware, async (req, res) => {
    console.log("hii aplode");
    const { title, description, price, owner } = req.body;
    console.log(req.body);
    if (!title || !description || !price || !owner) {
        return res.status(403).send({ msg: "Incomplete info of course" });
    }

    try {
        // No need for new ObjectId, just validate or convert the ID as a string
        const teacherId = req.user.userId;
        const teacher = await Teacher.findById(teacherId);
        console.log('Teacher found:', teacher);
        if (!teacher) {
            return res.status(404).send({ msg: "Teacher not found" });
        }

        const course = await Course.create({
            title: title,
            description: description,
            price: price,
            owner: owner,
        });

        teacher.courses.push(course._id);
        await teacher.save();
        return res.status(201).send({ msg: "Course created successfully" });
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).send({ msg: "Course not created", error: error });
    }
});

router.get("/mycourses", teacherMiddleware, async(req, res) =>{
    try{
        const teacher = await Teacher.findById(req.teacher._id).populate("courses")
        return res.status(201).send({courses : teacher.courses})
    }catch(error){
        return res.status(500).send({msg :"Error in fetching courses"})
    }
})

module.exports = router;