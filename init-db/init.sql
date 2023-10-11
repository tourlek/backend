-- Create the 'users' table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  accessToken TEXT,
  provide VARCHAR(255),
  postalCode INT,
  subDistrict VARCHAR(255),
  district VARCHAR(255),
  road VARCHAR(255),
  addressNo VARCHAR(255),
  streetAddress VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'employee' table
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  lastName VARCHAR(255),
  cardNumberId VARCHAR(13),
  phone VARCHAR(10),
  email VARCHAR(255),
  employeeType VARCHAR(255),
  user_id INT,
  address_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the 'employers' table
CREATE TABLE employers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  user_id INT,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  dateOfBirth VARCHAR(255),
  placeOfBirth VARCHAR(255),
  age VARCHAR(255),
  marital VARCHAR(255),
  nationality VARCHAR(255),
  gender VARCHAR(255),
  workType VARCHAR(255),
  tm6 VARCHAR(255),
  checkpoint VARCHAR(255),
  passportId VARCHAR(255),
  issuedAt VARCHAR(255),
  start VARCHAR(255),
  end VARCHAR(255),
  visaType VARCHAR(255),
  passportIdOld VARCHAR(255),
  issuedAtOld VARCHAR(255),
  startOld VARCHAR(255),
  endOld VARCHAR(255),
  workTypeOld VARCHAR(255),
  visaTypeOld VARCHAR(255),
  port VARCHAR(255),
  portDate VARCHAR(255),
  transportation VARCHAR(255),
  form VARCHAR(255),
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employee(id)
);

-- Create the 'address' table
CREATE TABLE address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  provide VARCHAR(255),
  postalCode INT,
  subDistrict VARCHAR(255),
  district VARCHAR(255),
  road VARCHAR(255),
  addressNo VARCHAR(255),
  streetAddress VARCHAR(255),
  employee_id INT,
  FOREIGN KEY (employee_id) REFERENCES employee(id)
);