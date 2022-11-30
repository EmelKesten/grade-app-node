//app settings
const express = require("express");
const app = express();
const port = 8000;
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();


//importing routes
const register = require("./components/register");
const login = require("./components/login");
const addClass = require("./components/addClass")
const getUser = require("./components/getUser");
const addGrade = require("./components/addGrade");

//routes
app.post("/register", register);
app.post("/login", login);
app.post("/add-class/:userId", addClass);
app.get("/get-user/:userId", getUser);
app.post("/add-grade/:userId/:classId", addGrade);


//server
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
});

