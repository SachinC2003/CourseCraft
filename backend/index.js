require('dotenv').config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();


const teacherRoute = require('./routes/teacher');
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')

// 1. Update Express CORS setup

const corsOptions = {
  origin: 'https://course-craft-client.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json({ message: 'CORS test successful' });
});
app.use('/teacher', teacherRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(PORT, ()=> {
    console.log(`app listen on port ${PORT}`);
})
