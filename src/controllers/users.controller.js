const users = require("../models/users.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../hash");

require("dotenv").config();

exports.jwtValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401); // No token provided
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTimeInSeconds) {
        return res.sendStatus(401); // Token has expired
      }
      next();
    });
  } catch (error) {
    return res.sendStatus(403);
  }
};

exports.addUser = async (req, res) => {
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
  } = req.body; // Destructure the request body to get user data

  try {
    const hashedPassword = await hashPassword(password); // Assuming you have a function to hash passwords

    const userData = {
      username,
      role,
      password: hashedPassword,
      streetAddress,
      addressNo,
      road,
      district,
      subDistrict,
      postalCode,
      provide,
      lastName,
      firstName,
    };

    users.addUser(userData, (err, data) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "User added successfully" });
      }
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findById = (req, res) => {
  const userId = req.params.id;
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const tokenId = decoded.id;
  if (parseInt(userId) !== parseInt(tokenId)) {
    return res.status(403).json({ error: "Access denied" });
  }
  users.getUserByID(userId, (err, data) => {
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

exports.findAll = (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ error: "Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;
    if (userRole !== "developer") {
      return res.status(403).json({ error: "Access denied" });
    }

    users.getAll((err, data) => {
      if (err) {
        res.status(404).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    return res.status(403).json({ error: "Access denied" });
  }
};
exports.logout = (req, res) => {
  users.logout(req, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Logout failed" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
};
exports.check = (req, res) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(401).json({ message: "Access token is missing." });
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Access token is invalid." });
      }

      // Check token expiration
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTimeInSeconds) {
        // Token has expired; delete it from the database
        const userId = decoded.id;

        // Update the token to null in the database
        users.updateUserToken(userId, null, (updateErr, updateResult) => {
          if (updateErr) {
            return res
              .status(500)
              .json({ message: "Error deleting user token." });
          }
          return res
            .status(401)
            .json({ message: "Access token has expired and was deleted." });
        });
      } else {
        return res.status(200).json({ message: "Access token is valid." });
      }
    });
  } catch (error) {
    return res.status(403).json({ message: "Forbidden." });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  users.getUserByUsername(username, async (err, userData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving user data.",
      });
      return;
    }
    if (!userData || !userData.length) {
      res.status(401).json({ error: "Invalid username" });
      return;
    }

    const storedPassword = userData[0].password;
    const userId = userData[0].id;
    const userRole = userData[0].role;
    try {
      const passwordMatch = await bcrypt.compare(password, storedPassword);
      console.log(password, storedPassword);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      const payload = { id: userId, username, role: userRole };
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
      res.cookie("userId", userId, { httpOnly: true });
      res.cookie("userRole", userRole, { httpOnly: true });

      users.updateUserToken(userId, token, (updateErr, updateResult) => {
        if (updateErr) {
          res.status(500).json({ error: "Error updating user token" });
        } else {
          res.json({ userId, username, userRole, token });
        }
      });
    } catch (bcryptErr) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
