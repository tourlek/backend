const employees = require("../models/employee.models");
const jwt = require("jsonwebtoken");

exports.addEmployee = async (req, res) => {
  const dataEmployee = {
    firstName: req.body.firstName,
    companyName: req.body.companyName,
    lastName: req.body.lastName,
    cardNumberId: req.body.cardNumberId,
    phone: req.body.phone,
    email: req.body.email,
    user_id: req.body.user_id,
    address_id: req.body.address_id,
    employeeType: req.body.employeeType,
  };

  try {
    employees.addEmployee(dataEmployee, (err, insertedEmployee) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const insertedId = insertedEmployee.insertId; // Assuming your data source returns the inserted ID
        res
          .status(200)
          .json({ id: insertedId, message: "Employee added successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployeeData = {
    firstName: req.body.firstName,
    companyName: req.body.companyName,
    lastName: req.body.lastName,
    cardNumberId: req.body.cardNumberId,
    phone: req.body.phone,
    email: req.body.email,
    address_id: req.body.address_id,
    employeeType: req.body.employeeType,
  };

  try {
    employees.updateEmployee(employeeId, updatedEmployeeData, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (data.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
      } else {
        res.status(200).json({ message: "Employee updated successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.id;

  employees.deleteEmployeeById(employeeId, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error deleting employee",
        error: err,
      });
    } else {
      res.status(200).json({
        message: "Employee deleted successfully",
        data: data,
      });
    }
  });
};
exports.findById = (req, res) => {
  const userId = req.params.id;
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const tokenId = decoded.id;
  if (parseInt(userId) !== parseInt(tokenId)) {
    return res.status(403).json({ error: "Access denied" });
  }
  employees.getEmployeeByID(userId, (err, data) => {
    if (err) {
      res.status(404).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    } else {
      res.send(data);
    }
  });
};
