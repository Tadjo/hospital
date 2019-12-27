const models = require("../../database/models");
var express = require("express");
var router = express.Router();

// load all patients
router.get("/", async function(req, res) {
  try {
    const patients = await models.Patient.findAll();
    res.json({ data: patients });
  } catch (error) {
    res.status(500).json(error);
  }
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
