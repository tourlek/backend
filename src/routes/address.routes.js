const users = require("../controllers/users.controller");
const address = require("../controllers/address.controller");
const router = require("express").Router();

//router.get("/address/:id", users.jwtValidate, address.findById);
router.post("/address", users.jwtValidate, address.addAddress);
router.delete("/address/:id", users.jwtValidate, address.deleteAddress);
router.patch("/address/:id", users.jwtValidate, address.updateAddress);

module.exports = router;
