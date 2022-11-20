const fs = require("fs");

const login = (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync("src/data/users.json"));
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json("User does not exist");
  }
  if (user.password !== password) {
    return res.status(400).json("Incorrect password");
  }
  res.status(200).send(user);
};

module.exports = login;