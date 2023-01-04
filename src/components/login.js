const { findUserByEmail } = require("../data/findUser");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).send("Email does not exist");
  }
  const passwordMatch = await bcrypt.compare(password, user[0].password);
  if (!passwordMatch) {
    return res.status(400).send("Incorrect password");
  }
  res.status(200).send({
    _id: user[0]._id,
    email: user[0].email,
    firstName: user[0].firstName,
    lastName: user[0].lastName,
    classes: user[0].classes,
  });
};

module.exports = login;
