const mongoose = require("mongoose");
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then((data) => {
  console.log("connected to MongoDB");
});

const UserSchema = new mongoose.Schema({
    username : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    role: { type: String, enum: ['user', 'teacher', 'admin'], default: 'user' },
    myCourses : [{type : mongoose.Schema.Types.ObjectId, ref : "Course"}],
})

const TeacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String, required: true },
    qualifications: { type: String, required: true },
    subjects: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String, required: true },
    qualifications: { type: String, required: true },
    subjects: [{ type: String }],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    owner : String,
    image : String,
    published : {type: Boolean , default : false}
})

const User = mongoose.model("User", UserSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);
const Course = mongoose.model("Course", CourseSchema)
const Application = mongoose.model("Application", ApplicationSchema)

module.exports = {
    User,
    Course,
    Teacher,
    Application
};

