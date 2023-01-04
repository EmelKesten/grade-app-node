const uuid = require("uuid");
const editUser = require("../data/editUser");
const getUsers = require("../data/getUsers");

const addClass = async (req, res) => {
  const { className } = req.body;
  const { userId } = req.params;
  const users = await getUsers();
  const user = users.find((user) => user._id === userId);
  if (!user) {
    return res.status(400).json("User does not exist");
  }
  if (!className) {
    return res.status(400).json("Please enter a class name");
  }
  if (user.classes.find((classObj) => classObj.name === className)) {
    return res.status(400).json("Class already exists");
  }
  const newUser = {
    _id: user._id,
    classes: [...user.classes, { name: className, id: uuid.v4(), grades: [] }],
  };
  editUser(newUser);
  res.status(200).send(newUser.classes);
};

module.exports = addClass;
