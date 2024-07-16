const express = require("express")
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')

const PORT = 3000;

app.use(bodyParser.json());
app.use("/admin", adminRoute);
app.use("/user", userRoute)

app.listen(PORT, ()=> {
    console.log(`app listen on port ${PORT}`);
})