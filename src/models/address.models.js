const db = require("../config/db");

module.exports.addAddress = (dataEmployee, result) => {
  const {
    provide,
    postalCode,
    subDistrict,
    district,
    road,
    addressNo,
    streetAddress,
    employee_id,
    user_id,
  } = dataEmployee;
  const query =
    "INSERT INTO address (provide, postalCode, subDistrict, district, road, addressNo, streetAddress, employee_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  console.log(query);
  db.query(
    query,
    [
      provide,
      postalCode,
      subDistrict,
      district,
      road,
      addressNo,
      streetAddress,
      employee_id,
      user_id,
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
module.exports.updateAddress = (employeeId, updatedAddressData, result) => {
  const {
    provide,
    postalCode,
    subDistrict,
    district,
    road,
    addressNo,
    streetAddress,
    employee_id,
    user_id,
  } = updatedAddressData;

  const query =
    "UPDATE address SET provide='" +
    provide +
    "', postalCode='" +
    postalCode +
    "', subDistrict='" +
    subDistrict +
    "', district='" +
    district +
    "', road='" +
    road +
    "', addressNo='" +
    addressNo +
    "', streetAddress='" +
    streetAddress +
    "', employee_id='" +
    employee_id +
    "', user_id='" +
    user_id +
    "' WHERE id=" +
    employeeId;

  db.query(query, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports.deleteAddressById = (employeeId, result) => {
  const query = "DELETE FROM address WHERE id = ?";

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

module.exports.getAddressByEmployeeID = (employee_id, callback) => {
  let query = "SELECT * FROM address WHERE employee_id = ?";
  db.query(query, [employee_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    console.log("user data: ", res);
    callback(null, res);
  });
};
module.exports.getAddressByID = (id, callback) => {
  let query = "SELECT * FROM address WHERE user_id = ?";
  db.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    console.log("user data: ", res);
    callback(null, res);
  });
};
