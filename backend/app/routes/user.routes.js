const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/superadmin", [authJwt.verifyToken, authJwt.isSuperAdmin], controller.superAdminBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/doctor",
    [authJwt.verifyToken, authJwt.isDoctor],
    controller.doctorBoard
  );

  app.get(
    "/api/test/nurse",
    [authJwt.verifyToken, authJwt.isNurse],
    controller.nurseBoard
  );

  app.get(
    "/api/test/receptionist",
    [authJwt.verifyToken, authJwt.isReceptionist],
    controller.receptionistBoard
  );

  app.get(
    "/api/test/patient",
    [authJwt.verifyToken, authJwt.isPatient],
    controller.patientBoard
  );
};