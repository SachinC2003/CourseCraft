require('dotenv').config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();


const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user')
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend's origin
  }));

const PORT = 3000;

app.use(bodyParser.json());
app.use('/admin', adminRoute);
app.use("/user", userRoute)

app.listen(PORT, ()=> {
    console.log(`app listen on port ${PORT}`);
})