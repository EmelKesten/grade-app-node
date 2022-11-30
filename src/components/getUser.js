const { findUserByID } = require("../data/findUser");

const calculateGradeAverage = (grades) => {
  if (!grades || grades.length === 0) {
    return 0;
  }
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
};
const calculateAverage = (grades) => {
  if (!grades || grades.length === 0) {
    return 0;
  }
  const newGrades = grades.map((grade) => calculateGradeAverage(grade.grades));
  return calculateGradeAverage(newGrades);
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  //const { Bearertoken } = req.headers;
  const user = await findUserByID(userId);
  if (!user) {
    return res.status(400).json("User does not exist");
  }
  //if (user.token !== Bearertoken) {
  //return res.status(400).json("Invalid token");
  //}
  const classes = () => {
    if (!user[0].classes) {
      return [];
    }
    const classes = user[0].classes.map((classObj) => {
      const average = calculateGradeAverage(classObj.grades);
      return {
        ...classObj,
        average,
      };
    });
    return classes;
  };
  const newUser = {
    _id: user[0]._id,
    email: user[0].email,
    firstName: user[0].firstName,
    lastName: user[0].lastName,
    classes: classes(),
    average: Math.round(calculateAverage(user[0].classes) * 100) / 100,
  };
  res.status(200).send(newUser);
};

module.exports = getUser;
