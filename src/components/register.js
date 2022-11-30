const { findUserByEmail } = require("../data/findUser");
const addUser = require("../data/addUser");
const uuid = require("uuid");
const validator = require("validator");

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    return res.status(400).json("Email already exists");
  }
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json("Please fill in all fields");
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json("Please enter a valid email");
  }
  if (password.length < 8) {
    return res.status(400).json("Password must be at least 8 characters");
  }
  const newUser = {
    _id: uuid.v4(),
    email,
    password,
    firstName,
    lastName,
    classes: [],
  };
  addUser(newUser);
  res.status(200).send({
    _id: newUser._id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });
};

module.exports = register;
