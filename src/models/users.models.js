const db = require("../config/db");

module.exports.addUser = (userData, result) => {
  const {
    username,
    role,
    password,
    streetAddress,
    addressNo,
    road,
    district,
    subDistrict,
    postalCode,
    provide,
    lastName,
    firstName,
  } = userData;

  const query =
    "INSERT INTO users (username, role, password, streetAddress, addressNo, road, district, subDistrict, postalCode, provide, lastName, firstName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      username,
      role,
      password,
      streetAddress,
      addressNo,
      road,
      district,
      subDistrict,
      postalCode,
      provide,
      lastName,
      firstName,
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

module.exports.getAll = (result) => {
  let query = "SELECT * FROM users";
  db.query(query, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};
module.exports.getUserByID = (userId, callback) => {
  let query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], (err, res) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, res);
  });
};
module.exports.getUserByUsername = (username, callback) => {
  let query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    callback(null, res);
  });
};
module.exports.getTokenByUserId = (username, callback) => {
  let query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    console.log("user data: ", res);
    callback(null, res);
  });
};
module.exports.updateUserToken = (userId, newToken, callback) => {
  const query = "UPDATE users SET accessToken = ? WHERE id = ?";
  db.query(query, [newToken, userId], (err, res) => {
    if (err) {
      console.log("error!!: ", err);
      callback(err, null);
      return;
    }
    console.log("Token updated successfully");
    callback(null, res);
  });
};
module.exports.logout = (req, callback) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      callback(err, null);
    } else {
      console.log("Logout successful");
      callback(null, "Logout successful");
    }
  });
};
