const {Router} = require("express")
const router = Router();
const mongoose = require('mongoose');
/*const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")*/

const {Teacher, Course, User} = require("../db/index");
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
    const { title, description, price } = req.body; 
    if (!title || !description || !price) {
        return res.status(403).send({ msg: "Incomplete info of course" });
    }

    try {
        const userId = req.user.userId;
        const teacher = await Teacher.findOne({ user: userId });
        console.log('Teacher found:', teacher);

        if (!teacher) {
            return res.status(404).send({ msg: "Teacher not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        const course = await Course.create({
            title: title,
            description: description,
            price: price,
            owner: user.username,  // Set owner to the teacher's username
        });

        user.myCourses.push(course._id);
        await user.save();

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