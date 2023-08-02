if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const app = express();
const DATABASE_URL = process.env.DATABASE_URL
const userRouter =require('./router/userRouter')
const adminRouter=require('./router/adminRouter')
const dbConnect = require('./config/dbconnection');

dbConnect(DATABASE_URL)

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");

// api routes
app.use('/',userRouter)
app.use('/admin/',adminRouter)


const port = 8000;

app.get("/", (req, res) => {
  res.status(201).json("home get req");
});

app.listen(port, () => {
  console.log(`Server Connected to port ${port}`);
});
