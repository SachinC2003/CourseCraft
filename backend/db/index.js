const mongoose = require("mongoose");
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then((data) => {
  console.log("connected to MongoDB");
});

const AdminSchema = new mongoose.Schema({
    username : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
})

const UserSchema = new mongoose.Schema({
    username : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    myCourses : [{type : mongoose.Schema.Types.ObjectId, ref : "Course"}],
})

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    owner : String,
    image : String,
    published : {type: Boolean , default : false}
})

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema)

module.exports = {
    Admin,
    User,
    Course,
};

