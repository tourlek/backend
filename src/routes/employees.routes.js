const users = require("../controllers/users.controller");
const employees = require("../controllers/employee.controller");
const router = require("express").Router();

// Define the route for fetching users

router.get("/employee/:id", users.jwtValidate, employees.findById);
router.post("/employee", users.jwtValidate, employees.addEmployee);
router.delete("/employee/:id", users.jwtValidate, employees.deleteEmployee);
router.patch("/employee/:id", users.jwtValidate, employees.updateEmployee);

module.exports = router;
