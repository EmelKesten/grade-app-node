const fs = require("fs");
const uuid = require("uuid");
const validator = require("validator");

const register = (req, res) => {
    const { email, password, name } = req.body;
    const users = JSON.parse(fs.readFileSync("../data/users.json"));
    const user = users.find((user) => user.email === email);
    if (user) {
        return res.status(400).json("Email already exists");
    }
    if (!email || !password || !name) {
        return res.status(400).json("Please fill in all fields");
    }
    if (validator.isEmail(email)) {
        return res.status(400).json("Please enter a valid email");
    }
    if (password.length < 8) {
        return res.status(400).json("Password must be at least 8 characters");
    }
    const newUser = {
        id: uuid.v4(),
        email,
        password,
        name,
        notes: [],
    };
    users.push(newUser);
    fs.writeFileSync("../data/users.json", JSON.stringify(users));
    res.status(200).json("User registered successfully");
};

module.exports = register;