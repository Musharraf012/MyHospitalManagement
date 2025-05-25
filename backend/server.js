const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(db.url,)
  .then(() => {
    console.log("Connected to the database!");
    initial()
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hospital Management." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

console.log(db.role);



function initial() {
 Role.estimatedDocumentCount()
    .then(count => {
      if (count === 0) {
        new Role({ name: "super admin" })
          .save()
          .then(() => console.log("added 'super admin' to roles collection"))
          .catch(err => console.log("error", err));

        new Role({ name: "admin" })
          .save()
          .then(() => console.log("added 'admin' to roles collection"))
          .catch(err => console.log("error", err));

        new Role({ name: "doctor" })
          .save()
          .then(() => console.log("added 'doctor' to roles collection"))
          .catch(err => console.log("error", err));

        new Role({ name: "nurse" })
          .save()
          .then(() => console.log("added 'nurse' to roles collection"))
          .catch(err => console.log("error", err));

        new Role({ name: "receptionist" })
          .save()
          .then(() => console.log("added 'receptionist' to roles collection"))
          .catch(err => console.log("error", err));

        new Role({ name: "patient" })
          .save()
          .then(() => console.log("added 'patient' to roles collection"))
          .catch(err => console.log("error", err));
      }
    })
    .catch(err => console.log(err));
}