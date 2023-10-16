const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const port = 8080;

app.use(cors());
app.use(helmet());

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

const userRoute = require("./routes/users.routes");
const employeeRoute = require("./routes/employees.routes");
const employerRoute = require("./routes/employers.routes");
const addressRoute = require("./routes/address.routes");

app.use("/api", userRoute, employeeRoute, employerRoute, addressRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
