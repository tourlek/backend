const db = require("../config/db");

module.exports.addEmployee = (dataEmployee, result) => {
  const {
    firstName,
    companyName,
    lastName,
    cardNumberId,
    phone,
    email,
    user_id,
    address_id,
    employeeType,
  } = dataEmployee;
  const query =
    "INSERT INTO employee (firstName, companyName, lastName, cardNumberId, phone, email, user_id,address_id, employeeType) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?)";

  db.query(
    query,
    [
      firstName,
      companyName,
      lastName,
      cardNumberId,
      phone,
      email,
      user_id,
      address_id,
      employeeType,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
module.exports.updateEmployee = (employeeId, updatedEmployeeData, result) => {
  const {
    firstName,
    companyName,
    lastName,
    cardNumberId,
    phone,
    email,
    address_id,
    employeeType,
  } = updatedEmployeeData;
  const query =
    "UPDATE employee SET firstName=?, companyName=?, lastName=?, cardNumberId=?, phone=?, email=?,address_id=?, employeeType=? WHERE id=?";

  db.query(
    query,
    [
      firstName,
      companyName,
      lastName,
      cardNumberId,
      phone,
      email,
      address_id,
      employeeType,
      employeeId,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports.deleteEmployeeById = (employeeId, result) => {
  const query = "DELETE FROM employee WHERE id = ?";

  db.query(query, [employeeId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ message: "Employee not found" }, null);
      return;
    }

    result(null, res);
  });
};
module.exports.getEmployeeByID = (userId, callback) => {
  let query = "SELECT * FROM employee WHERE user_id = ?";
  db.query(query, [userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    console.log("user data: ", res);
    callback(null, res);
  });
};
