const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");
const studentRouter = require("./routes/student");
const fs = require("fs");
const path = require("path");

// configure dotenv
dotenv.config();

// REST Object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// Create a write stream (in append mode)
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"));

// Set up morgan to log requests to the file
app.use(
  morgan("tiny", {
    skip: (req) => req.url === "/favicon.ico",
    stream: logStream,
  })
);

//routes
app.use("/api/v1/student", studentRouter);

// test route
app.get("/test", (req, res) => {
  res.status(200).send("<h1>Nodejs and MySQL - CURD App");
});

// Port, In case of any error use 8000 instead of default
const PORT = process.env.PORT || 8000;

// conditionally listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    // MySQL
    console.log("MySQL DB Connected".red);
    // listen
    app.listen(PORT, () => {
      console.log(`Server Started at Port ${PORT}`.red);
    });
  })
  .catch((error) => {
    console.log(error);
  });
