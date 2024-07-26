const {Route} = require("express")
const router = Router()

const {Teacher, User} = require("../db/index")
const {adminMiddleware} = require("../middleware/user")
const users = require("..");

router.get("/courses", Usermiddleware, async(req, res)=>{
    try{
        const allcourses = await Course.find()
        return res.status(201).send({courses: allcourses})
    }catch(error){
        return res.status(500).send({msg : "error to fetching courses", error : error})
    }
})

router.get("/teachers", adminMiddleware, async(req, res)=>{
    try{
        const allteachers = await Teacher.find()
        return res.status(201).send({teachers: allteachers})
    }catch(error){
        return res.status(500).send({msg : "error to fetching techers", error : error})
    }
})

router.put("/aprove/:id", adminMiddleware, async(req, res) =>{
    const teacherId = req.params.id;
    try{
        const teacher = await Teacher.findById(teacherId);
        if(!teacher){
            return res.status(404).send({msg : "Teacher application not found"});
        }

        teacher.status = 'approved';
        await teacher.save();

        await User.findByIdAndUpdate(teacherId, {role:"tecaher"});
        return res.status(200).send({ msg: "Teacher application approved successfully" });
    } catch (error) {
        console.error('Error in /approve-teacher route:', error);
        return res.status(500).send({ msg: "Failed to approve teacher application", error: error.message });
    }
})
