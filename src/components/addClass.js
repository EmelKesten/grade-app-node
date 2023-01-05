const uuid = require("uuid");
const editUser = require("../data/editUser");
const { findUserByID } = require("../data/findUser");
const jwt = require("jsonwebtoken");


const addClass = async (req, res) => {
  const { className } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const userjwt = jwt.verify(token, "RS256");
  const user = await findUserByID(userjwt._id);
  if (!user[0]) {
    return res.status(400).json("User does not exist");
  }
  if (!className) {
    return res.status(400).json("Please enter a class name");
  }
  if (user[0].classes.find((classObj) => classObj.name === className)) {
    return res.status(400).json("Class already exists");
  }
  const newUser = {
    _id: user[0]._id,
    classes: [...user[0].classes, { name: className, id: uuid.v4(), grades: [] }],
  };
  editUser(newUser);
  res.status(200).send(newUser.classes);
};

module.exports = addClass;
