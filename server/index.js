require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const app = express();

require("./passport")(app);
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  next();
});
// add a basic route
app.get("/", function(req, res) {
  res.json({ message: "Express is up!" });
});

// get all users
app.get("/users", function(req, res) {
  helpers.getAllUsers().then(user => res.json(user));
});

// register route
app.post("/register", function(req, res, next) {
  const {
    firstName,
    lastName,
    middleName,
    position,
    employmentDate,
    room,
    login,
    password
  } = req.body;
  helpers
    .createUser({
      firstName,
      lastName,
      middleName,
      position,
      employmentDate,
      room,
      login,
      password
    })
    .then(user => res.json({ user, msg: "account created successfully" }))
    .catch(err => console.log(err));
});

// login route
app.post("/login", async function(req, res, next) {
  const { login, password } = req.body;
  if (login && password) {
    let user = await helpers.getUser({ login });
    if (!user) {
      res.status(401).json({ msg: "No such user found", user });
    }
    if (bcrypt.compareSync(password, user.password)) {
      // from now on we’ll identify the user by the id and the id is
      // the only personalized value that goes into our token
      let payload = { id: user.id, login: user.login };
      let token = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ msg: "ok", token: token, user: payload });
    } else {
      res.status(401).json({ msg: "Password is incorrect" });
    }
  }
});

app.get("/profile", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
) {
  res.json({ profile: req.user });
});

app.use('/patients', require('./controllers/patients'));

require("./db").connect();

// start the app
app.listen(8081, () => {
  console.log("Express is running on port 8081");
});
