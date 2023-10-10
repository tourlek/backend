const addresses = require("../models/address.models"); // Import the address model instead of the employee model

exports.addAddress = async (req, res) => {
  const dataAddress = {
    provide: req.body.provide,
    postalCode: req.body.postalCode,
    subDistrict: req.body.subDistrict,
    district: req.body.district,
    road: req.body.road,
    addressNo: req.body.addressNo,
    streetAddress: req.body.streetAddress,
    employee_id: req.body.employee_id,
  };
  try {
    addresses.addAddress(dataAddress, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Address added successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateAddress = async (req, res) => {
  const employeeId = req.params.id;
  const updatedAddressData = {
    provide: req.body.provide,
    postalCode: req.body.postalCode,
    subDistrict: req.body.subDistrict,
    district: req.body.district,
    road: req.body.road,
    addressNo: req.body.addressNo,
    streetAddress: req.body.streetAddress,
    employee_id: req.body.employee_id,
  };

  try {
    addresses.updateAddress(employeeId, updatedAddressData, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (data.affectedRows === 0) {
        res.status(404).json({ error: "Address not found" });
      } else {
        res.status(200).json({ message: "Address updated successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAddress = (req, res) => {
  const employeeId = req.params.id;

  addresses.deleteAddressById(employeeId, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error deleting address",
        error: err,
      });
    } else if (data.affectedRows === 0) {
      res.status(404).json({ error: "Address not found" });
    } else {
      res.status(200).json({
        message: "Address deleted successfully",
        data: data,
      });
    }
  });
};
