const models = require("../database/models");

exports.createUser = async ({
  firstName,
  lastName,
  middleName,
  position,
  employmentDate,
  room,
  login,
  password
}) => {
  return await models.User.create({
    firstName,
    lastName,
    middleName,
    position,
    employmentDate,
    room,
    login,
    password
  });
};
exports.getAllUsers = async () => {
  return await models.User.findAll();
};
exports.getUser = async obj => {
  return await models.User.findOne({
    where: obj
  });
};
