const getUsers = require("../data/getUsers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).send("Email does not exist");
  }
  if (user.password !== password) {
    return res.status(400).send("Incorrect password");
  }
  res.status(200).send(user);
}

module.exports = login;