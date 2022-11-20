const fs = require("fs");
const uuid = require("uuid");

const addClass = (req, res) => {
    const { className } = req.body;
    const { userId } = req.params;
    const users = JSON.parse(fs.readFileSync("src/data/users.json"));
    const user = users.find((user) => user.id === userId);
    const classExists = user.classes.find((classObj) => classObj.className === className);
    if (!user) {
        return res.status(400).json("User does not exist");
    }
    if (!className) {
        return res.status(400).json("Please enter a class name");
    }
    if (classExists) {  
        return res.status(400).json("Class already exists");
    }
    const newClass = {
        id: uuid.v4(),
        className,
        grades: [1, 2, 3],
    };
    user.classes.push(newClass);
    fs.writeFileSync("src/data/users.json", JSON.stringify(users));
    res.status(200).send(newClass);
};

module.exports = addClass;