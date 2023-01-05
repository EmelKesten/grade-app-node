const { findUserByID } = require("../data/findUser");
const jwt = require("jsonwebtoken");


const calculateGradeAverage = (grades) => {
  if (!grades || grades.length === 0) {
    return 0;
  }
  let sum = 0
  grades.forEach((grade) => {
    sum += +grade.grade;
  });
  return sum / grades.length;
};
const calculateAverage = (grades) => {
  if (!grades || grades.length === 0) {
    return 0;
  }
  const newGrades = grades.map((grade) => {return grade.average});
  let sum = 0
  newGrades.forEach((grade) => {
    sum += grade;
  }
  );
  return sum / grades.length;
};

const getUser = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const userjwt = jwt.verify(token, "RS256");
  const user = await findUserByID(userjwt._id);
  if (!user[0]) {
    return res.status(400).json("User does not exist");
  }
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
    average: Math.round(calculateAverage(classes()) * 100) / 100,
  };
  res.status(200).send(newUser);
};

module.exports = getUser;
