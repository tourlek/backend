const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();

const app = express();
const port = 8080;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname));
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: process.env.JWT_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
const userRoute = require("./src/routes/users.routes");

app.use("/api", userRoute);
require("./src/routes/users.routes");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
