require('dotenv').config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();


const teacherRoute = require('./routes/teacher');
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')

const corsOptions = {
  origin: '*', 
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = 3000;

app.use(bodyParser.json());
app.use('/teacher', teacherRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(PORT, ()=> {
    console.log(`app listen on port ${PORT}`);
})