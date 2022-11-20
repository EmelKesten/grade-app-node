const express = require("express");
const app = express();
const port = 8000;
app.use(express.json());
const register = require("./components/register");
const addClass = require("./components/addClass");
const getClasses = require("./components/getClasses");
const addGrade = require("./components/addGrade");


app.post("/register", register);
app.post("/add-class/:userId", addClass);
app.get("/get-classes/:userId", getClasses);
app.post("/add-grade/:userId/:classId", addGrade);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});