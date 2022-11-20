const express = require("express");
const app = express();
const port = 8000;
app.use(express.json());
const register = require("./components/register");
const addClass = require("./components/addClass");
const getClasses = require("./components/getClasses");
const addGrade = require("./components/addGrade");
const login = require("./components/login");


app.post("/register", register);
app.post("/add-class/:userId", addClass);
app.get("/get-classes/:userId", getClasses);
app.post("/add-grade/:userId/:classId", addGrade);
app.post("/login", login);



app.listen(process.env.PORT || port);