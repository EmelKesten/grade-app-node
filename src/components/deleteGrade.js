const { findUserByID } = require("../data/findUser");
const editUser = require("../data/editUser");


const deleteGrade = async (req, res) => {
    const { classId, gradeId } = req.params;
    const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const userjwt = jwt.verify(token, "RS256");
  const user = await findUserByID(userjwt._id);
  if (!user[0]) {
    return res.status(400).json("User does not exist");
  }
    const classObj = user[0].classes.find((classObj) => classObj.id === classId);
    if (!classObj) {
        return res.status(400).send("Class does not exist");
    }
    const grade = classObj.grades.find((grade) => grade.id === gradeId);
    if (!grade) {
        return res.status(400).send("Grade does not exist");
    }
    classObj.grades = classObj.grades.filter((grade) => grade.id !== gradeId);
    await editUser(user[0]);
    res.status(200).send(user[0].classes);
};

module.exports = deleteGrade;