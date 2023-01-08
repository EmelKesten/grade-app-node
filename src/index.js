//app settings
const express = require("express");
const app = express();
const port = 8001;
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());

//importing routes
const register = require("./components/register");
const login = require("./components/login");
const addClass = require("./components/addClass");
const getUser = require("./components/getUser");
const addGrade = require("./components/addGrade");
const deleteGrade = require("./components/deleteGrade");
const getAverage = require("./components/getAverage");

//routes
app.post("/register", register);
app.post("/login", login);
app.post("/add-class", addClass);
app.get("/get-user", getUser);
app.post("/add-grade/:classId", addGrade);
app.delete("/delete-grade/:classId/:gradeId", deleteGrade);
app.get("/get-average", getAverage);

//404
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

//server
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
