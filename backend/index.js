require('dotenv').config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();


const teacherRoute = require('./routes/teacher');
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
app.use(cors({
    origin: '*' // Replace with your frontend's origin
  }));

const PORT = 3000;

app.use(bodyParser.json());
app.use('/teacher', teacherRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(PORT, ()=> {
    console.log(`app listen on port ${PORT}`);
})