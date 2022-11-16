const express = require("express");
const app = express();
const port = 8000;
app.use(express.json());
const register = require("./components/register");

app.post("/register", register);



app.listen(port, () => {
    console.log(`App listening at port:${port}`);
});