const db = require("../config/db");

module.exports.addEmployer = (dataEmployer, result) => {
  const {
    employee_id,
    user_id,
    firstName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    age,
    marital,
    nationality,
    gender,
    workType,
    tm6,
    checkpoint,
    passportId,
    issuedAt,
    start,
    end,
    visaType,
    passportIdOld,
    issuedAtOld,
    workTypeOld,
    startOld,
    endOld,
    visaTypeOld,
    port,
    portDate,
    transportation,
    form,
    reason,
  } = dataEmployer;

  const query = `
    INSERT INTO employers (
      employee_id,
      user_id,
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      age,
      marital,
      nationality,
      gender,
      workType,
      tm6,
      checkpoint,
      passportId,
      issuedAt,
      start,
      end,
      visaType,
      passportIdOld,
      issuedAtOld,
      workTypeOld,
      startOld,
      endOld,
      visaTypeOld,
      port,
      portDate,
      transportation,
      form,
      reason
    ) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      employee_id,
      user_id,
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      age,
      marital,
      nationality,
      gender,
      workType,
      tm6,
      checkpoint,
      passportId,
      issuedAt,
      start,
      end,
      visaType,
      passportIdOld,
      issuedAtOld,
      workTypeOld,
      startOld,
      endOld,
      visaTypeOld,
      port,
      portDate,
      transportation,
      form,
      reason,
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

module.exports.updateEmployer = (employerId, updatedEmployerData, result) => {
  const {
    employee_id,
    user_id,
    firstName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    age,
    marital,
    nationality,
    gender,
    workType,
    tm6,
    checkpoint,
    passportId,
    issuedAt,
    start,
    end,
    visaType,
    passportIdOld,
    issuedAtOld,
    workTypeOld,
    startOld,
    endOld,
    visaTypeOld,
    port,
    portDate,
    transportation,
    form,
    reason,
  } = updatedEmployerData;
  console.log(updatedEmployerData);
  const query = `
  UPDATE employers
  SET
    employee_id = ?,
    user_id = ?,
    firstName = ?,
    lastName = ?,
    dateOfBirth = ?,
    placeOfBirth = ?,
    age = ?,
    marital = ?,
    nationality = ?,
    gender = ?,
    workType = ?,
    tm6 = ?,
    checkpoint = ?,
    passportId = ?,
    issuedAt = ?,
    start = ?,
    end = ?,
    visaType = ?,
    passportIdOld = ?,
    issuedAtOld = ?,
    workTypeOld = ?,
    startOld = ?,
    endOld = ?,
    visaTypeOld = ?,
    port = ?,
    portDate = ?,
    transportation = ?,
    form = ?,
    reason = ?
  WHERE id = ?;

  `;

  db.query(
    query,
    [
      employee_id,
      user_id,
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      age,
      marital,
      nationality,
      gender,
      workType,
      tm6,
      checkpoint,
      passportId,
      issuedAt,
      start,
      end,
      visaType,
      passportIdOld,
      issuedAtOld,
      workTypeOld,
      startOld,
      endOld,
      visaTypeOld,
      port,
      portDate,
      transportation,
      form,
      reason,
      employerId,
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

module.exports.deleteEmployerById = (employerId, result) => {
  const query = "DELETE FROM employers WHERE id = ?";

  db.query(query, [employerId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ message: "Employer not found" }, null);
      return;
    }

    result(null, res);
  });
};
module.exports.getEmployerByEmployeeID = (userId, callback) => {
  let query = "SELECT * FROM employers WHERE employee_id = ?";
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
module.exports.getEmployerByID = (userId, callback) => {
  let query = "SELECT * FROM employers WHERE id = ?";
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
module.exports.getAllEmployer = (userId, callback) => {
  let query = "SELECT * FROM employers WHERE user_id = ?";
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
