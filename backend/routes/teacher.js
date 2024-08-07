const {Router} = require("express")
const router = Router();
const mongoose = require('mongoose');
/*const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")*/
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
/*------------------------------------------------------------------*/
const upload = multer({ storage: multer.memoryStorage() });

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

router.post("/aplodcourse", authMiddleware, upload.array('images', 5), async (req, res) => {
    const { title, description, price } = req.body;

    // Check if at least 2 images were uploaded
    if (!req.files || req.files.length < 2) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: At least 2 image files are required.'
        });
    }

    if (!title || !description || !price) {
        return res.status(403).send({ msg: "Incomplete info of course" });
    }

    try {
        const userId = req.user.userId;
        const teacher = await Teacher.findOne({ user: userId });

        if (!teacher) {
            return res.status(404).send({ msg: "Teacher not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        const imageUploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                }).end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(imageUploadPromises);

        const course = await Course.create({
            title: title,
            description: description,
            price: price,
            imageUrls: imageUrls
        });

        user.myCourses.push(course._id);
        await user.save();

        return res.status(201).send({ msg: "Course created successfully" });
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).send({ msg: "Course not created", error });
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