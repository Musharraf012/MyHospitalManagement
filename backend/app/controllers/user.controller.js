const sendBoardContent = (content) => (req, res) => {
  res.status(200).send(`${content} Content.`);
};

exports.allAccess = sendBoardContent("Public");
exports.superAdminBoard = sendBoardContent("Super Admin");
exports.adminBoard = sendBoardContent("Admin");
exports.doctorBoard = sendBoardContent("Doctor");
exports.nurseBoard = sendBoardContent("Nurse");
exports.receptionistBoard = sendBoardContent("Receptionist");
exports.patientBoard = sendBoardContent("Patient");
