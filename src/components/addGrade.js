const { findUserByID } = require("../data/findUser");
const editUser = require("../data/editUser");
const uuid = require("uuid");

const addGrade = async (req, res) => {
  const { grade } = req.body;
  const { userId, classId } = req.params;
  const user = await findUserByID(userId);
  const classObj = user[0].classes.find((classObj) => classObj.id === classId);
  if (!classObj) {
    return res.status(400).send("Class does not exist");
  }
  classObj.grades.push({
    id: uuid.v4(),
    grade
  });
  await editUser(user[0]);
  res.status(200).send(user[0].classes);
};

module.exports = addGrade;
