const fs = require("fs");

const calculateAverage = (grades) => {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
};

const getClasses = (req, res) => {
  const { userId } = req.params;
  const users = JSON.parse(fs.readFileSync("src/data/users.json"));
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(400).json("User does not exist");
  }
  const classes = user.classes.map((classObj) => {
    const average = calculateAverage(classObj.grades);
    return {
      id: classObj.id,
      className: classObj.className,
      average,
    };
  });
  res.status(200).send(classes);
};

module.exports = getClasses;