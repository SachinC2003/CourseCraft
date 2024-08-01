const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Teacher, Course, Application } = require("../db/index");
const Usermiddleware = require("../middleware/user");
const authMiddleware = require("../middleware/authMiddleware");

// Remove the incorrect import:
// const users = require("..");
router.get('/me', authMiddleware, async (req, res) => {

  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password'); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ userId: user._id, username: user.username, role: user.role }); // Include role here
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
    const user = await User.create({ username, password: hashedPassword, role: 'user' }); // Set default role

    // Generate a token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

    return res.status(201).send({
      msg: 'User created',
      token,
      userId: user._id.toString(),
      role: user.role
    });
  } catch (error) {
    console.error('Error creating user:', error);
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

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res.status(200).send({ 
      token,
      userId: user._id.toString(),
      role: user.role
    });
  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
});

router.get("/courses", authMiddleware, async (req, res) => {
  try {
    const allcourses = await Course.find();
    return res.status(201).send({ courses: allcourses });
  } catch (error) {
    return res.status(500).send({ msg: "error to fetching courses", error: error });
  }
});

router.post("/bye/:courseid", Usermiddleware, async (req, res) => {
  const courseid = req.params.courseid;
  if (!courseid) {
    return res.status(403).send({ msg: "course id not found" });
  }

  try {
    const course = await Course.findById(courseid);
    if (!course) {
      return res.status(403).send({ msg: "course with given id not found" });
    }

    const user = await User.findById(req.user._id);

    if (user.myCourses.includes(course._id)) {
      return res.status(403).send({ msg: "course with given id exist" });
    }

    user.myCourses.push(course);
    user.save();
    return res.status(200).send({ message: "Course purchased successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error fetching course" });
  }
});

router.get("/purchasedCourses", Usermiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("myCourses");
    return res.status(200).send({ purchasedCourses: user.myCourses });
  } catch (error) {
    return res.status(500).send({ message: "Error fetching courses" });
  }
});

router.post("/applay", authMiddleware, async (req, res) => {
  console.log('Received request at /applay');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('User from middleware:', req.user);

  const { bio, qualifications, subject } = req.body;
  const userId = req.user.userId; // Get userId from the authenticated user

  if (!bio || !qualifications || !subject) {
    return res.status(400).send({ msg: "All fields are required" });
  }

  try {
    const teacher = await Teacher.findOne({ user: userId });
    if (teacher) {
      return res.status(409).send({ msg: "Teacher application already exists for this user" });
    }

    const newTeacher = await Application.create({
      user: userId,
      bio,
      qualifications,
      subject,
      status: "pending"
    });

    console.log('Teacher application created successfully');
    return res.status(201).send({ msg: "Applied for teacher successfully" });
  } catch (error) {
    console.error('Error in /applay route:', error);
    return res.status(500).send({ msg: "Teacher application failed", error: error.message });
  }
});

module.exports = router;
