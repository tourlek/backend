const employers = require("../models/employer.models");
const jwt = require("jsonwebtoken");

exports.addEmployer = async (req, res) => {
  const dataEmployer = {
    employee_id: parseInt(req.body.employee_id),
    user_id: parseInt(req.body.user_id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    placeOfBirth: req.body.placeOfBirth,
    age: req.body.age,
    marital: req.body.marital,
    nationality: req.body.nationality,
    gender: req.body.gender,
    workType: req.body.workType,
    tm6: req.body.tm6,
    checkpoint: req.body.checkpoint,
    passportId: req.body.passportId,
    issuedAt: req.body.issuedAt,
    start: req.body.start,
    end: req.body.end,
    visaType: req.body.visaType,
    passportIdOld: req.body.passportIdOld,
    issuedAtOld: req.body.issuedAtOld,
    workTypeOld: req.body.workTypeOld,
    startOld: req.body.startOld,
    endOld: req.body.endOld,
    visaTypeOld: req.body.visaTypeOld,
    port: req.body.port,
    portDate: req.body.portDate,
    transportation: req.body.transportation,
    form: req.body.form,
    reason: req.body.reason,
  };

  try {
    employers.addEmployer(dataEmployer, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Employer added successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateEmployer = async (req, res) => {
  const employerId = req.params.id;
  const updatedEmployerData = {
    employee_id: parseInt(req.body.employee_id),
    user_id: parseInt(req.body.user_id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    placeOfBirth: req.body.placeOfBirth,
    age: req.body.age,
    marital: req.body.marital,
    nationality: req.body.nationality,
    gender: req.body.gender,
    workType: req.body.workType,
    tm6: req.body.tm6,
    checkpoint: req.body.checkpoint,
    passportId: req.body.passportId,
    issuedAt: req.body.issuedAt,
    start: req.body.start,
    end: req.body.end,
    visaType: req.body.visaType,
    passportIdOld: req.body.passportIdOld,
    issuedAtOld: req.body.issuedAtOld,
    workTypeOld: req.body.workTypeOld,
    startOld: req.body.startOld,
    endOld: req.body.endOld,
    visaTypeOld: req.body.visaTypeOld,
    port: req.body.port,
    portDate: req.body.portDate,
    transportation: req.body.transportation,
    form: req.body.form,
    reason: req.body.reason,
  };

  try {
    employers.updateEmployer(employerId, updatedEmployerData, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (data.affectedRows === 0) {
        res.status(404).json({ error: "Employer not found" });
      } else {
        res.status(200).json({ message: "Employer updated successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteEmployer = (req, res) => {
  const employerId = req.params.id;

  employers.deleteEmployerById(employerId, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error deleting employer",
        error: err,
      });
    } else {
      res.status(200).json({
        message: "Employer deleted successfully",
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
  employers.getEmployerByID(userId, (err, data) => {
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
exports.findByIdEmployee = (req, res) => {
  const userId = req.params.id;
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const tokenId = decoded.id;
  // if (parseInt(userId) !== parseInt(tokenId)) {
  //   return res.status(403).json({ error: "Access denied" });
  // }
  employers.getEmployerByEmployeeID(userId, (err, data) => {
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
exports.getAllEmployers = (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  employers.getAllEmployer(userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employers.",
      });
    } else {
      res.send(data);
    }
  });
};
