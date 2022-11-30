const { findUserByID } = require("../data/findUser");
const editUser = require("../data/editUser");

const addGrade = async (req, res) => {
  const { grades } = req.body;
  const { userId, classId } = req.params;
    const user = await findUserByID(userId);
    const classObj = user[0].classes.find((classObj) => classObj.id === classId);
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
  editUser(user[0]);
  res.status(200).send(classObj);
};

module.exports = addGrade;