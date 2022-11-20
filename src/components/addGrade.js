const fs = require("fs");
const uuid = require("uuid");

const addGrade = (req, res) => {
    const { grades } = req.body;
    const { userId, classId } = req.params;
    const users = JSON.parse(fs.readFileSync("src/data/users.json"));
    const user = users.find((user) => user.id === userId);
    const classObj = user.classes.find((classObj) => classObj.id === classId);
    if (!user) {
        return res.status(400).json("User does not exist");
    }
    if (!classObj) {
        return res.status(400).json("Class does not exist");
    }
    if (!grades) {
        return res.status(400).json("Please enter enter the grades");
    }
    classObj.grades = grades;
    fs.writeFileSync("src/data/users.json", JSON.stringify(users));
    res.status(200).send(newGrade);
}


module.exports = addGrade;