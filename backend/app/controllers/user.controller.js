exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.superAdminBoard = (req, res) => {
  res.status(200).send("Super Admin Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.doctorBoard = (req, res) => {
  res.status(200).send("Doctor Content.");
};

exports.nurseBoard = (req, res) => {
  res.status(200).send("Nurse Content.");
};

exports.receptionistBoard = (req, res) => {
  res.status(200).send("Receptionist Content.");
};

exports.patientBoard = (req, res) => {
  res.status(200).send("Patient Content.");
};

