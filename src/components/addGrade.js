const { findUserByID } = require("../data/findUser");
const editUser = require("../data/editUser");
const randomId = require("random-id");
const jwt = require("jsonwebtoken");


const addGrade = async (req, res) => {
  const { grade } = req.body;
  const { classId } = req.params;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const userjwt = jwt.verify(token, "RS256");
  const user = await findUserByID(userjwt._id);
  const classObj = user[0].classes.find((classObj) => classObj.id === classId);
  if (!classObj) {
    return res.status(400).send("Class does not exist");
  }
  classObj.grades.push({
    id: randomId(4, "aA0"),
    grade
  });
  await editUser(user[0]);
  res.status(200).send(user[0].classes);
};

module.exports = addGrade;
