const users = require("../controllers/users.controller");
const router = require("express").Router();

// Define the route for fetching users
router.get("/users", users.jwtValidate, users.findAll);
router.get("/users/:id", users.jwtValidate, users.findById);
router.post("/users", users.addUser);
router.post("/logout", users.jwtValidate, users.logout);
router.post("/login", users.login);

module.exports = router;
