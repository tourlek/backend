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
  } = dataEmployee;
  const query =
    "INSERT INTO address (provide, postalCode, subDistrict, district, road, addressNo, streetAddress,employee_id) VALUES (?,?, ?, ?, ?, ?, ?, ?)";

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
  } = updatedAddressData;

  const query =
    "UPDATE address SET provide=?, postalCode=?, subDistrict=?, district=?, road=?, addressNo=?, streetAddress=? WHERE employee_id=?";

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
