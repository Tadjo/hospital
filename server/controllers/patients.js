const models = require("../../database/models");
var express = require("express");
var router = express.Router();

// load all patients
router.get("/", function(req, res) {
  res.send("all patients");
});
// define the about route
router.post("/", async function(req, res) {
  const {
    firstName,
    lastName,
    middleName,
    datein,
    dateout,
    chamber,
    gender
  } = req.body;
  try {      
      const patient = await models.Patient.create({
        firstName,
        lastName,
        middleName,
        datein,
        dateout,
        chamber,
        gender
      });
      res.json(patient);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
