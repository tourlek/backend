const users = require("../controllers/users.controller");
const employers = require("../controllers/employer.controller");
const router = require("express").Router();

router.get(
  "/employer/employee/:id",
  users.jwtValidate,
  employers.findByIdEmployee
);
router.get("/employer/:id", users.jwtValidate, employers.findById);
router.get("/employer", users.jwtValidate, employers.getAllEmployers);
router.post("/employer", users.jwtValidate, employers.addEmployer);
router.delete("/employer/:id", users.jwtValidate, employers.deleteEmployer);
router.patch("/employer/:id", users.jwtValidate, employers.updateEmployer);

module.exports = router;
