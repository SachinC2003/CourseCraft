const express = require("express");
const router = express.Router();

const { Teacher, Course, Application } = require("../db/index");
const AdminMiddleware = require("../middleware/admin");
const authMiddleware = require("../middleware/authMiddleware")

router.get("/courses", AdminMiddleware, async (req, res) => {
    try {
        const allcourses = await Course.find();
        return res.status(201).send({ courses: allcourses });
    } catch (error) {
        return res.status(500).send({ msg: "Error fetching courses", error: error });
    }
});

router.get("/teachers",authMiddleware, AdminMiddleware, async (req, res) => {
    try {
        const allteachers = await Teacher.find();
        return res.status(201).send({ teachers: allteachers });
    } catch (error) {
        return res.status(500).send({ msg: "Error fetching teachers", error: error });
    }
});

router.get("/applications", async (req, res) => {
    try {
        const applications = await Application.find({ status: "pending" });
        console.log(applications)
        return res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applications", error: error.message });
    }
});

router.put("/approve/:id",authMiddleware, async (req, res) => {
    const applicationId = req.params.id;
    try {
        const application = await Application.findById(applicationId).populate('user');
        if (!application) {
            return res.status(404).send({ msg: "Teacher application not found" });
        }

        application.status = 'approved';
        await application.save();

        const { user } = application;
        user.role = "teacher";
        await user.save();

        const teacher = await Teacher.create({
            user: user._id,
            bio: application.bio,
            qualifications: application.qualifications,
            subjects: application.subjects
        });
        await teacher.save();
        return res.status(200).send({ msg: "Teacher application approved successfully" });
    } catch (error) {
        console.error('Error in /approve-teacher route:', error);
        return res.status(500).send({ msg: "Failed to approve teacher application", error: error.message });
    }
});

router.delete("/course/:id", authMiddleware, async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        await Course.findByIdAndDelete(courseId);
        res.status(200).json({ msg: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

router.delete("/teacher/:teacherId", authMiddleware, async (req, res) => {
    const teacherId = req.params.teacherId;
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }
        await Teacher.findByIdAndDelete(teacherId);
        res.status(200).json({ msg: "Teacher deleted successfully" });
    } catch (error) {
        console.error("Error deleting teacher:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
