const { findUserByID } = require("../data/findUser");
const editUser = require("../data/editUser");


const deleteGrade = async (req, res) => {
    const { userId, classId, gradeId } = req.params;
    const user = await findUserByID(userId);
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