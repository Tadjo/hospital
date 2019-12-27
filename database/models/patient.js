'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    datein: DataTypes.DATE,
    dateout: DataTypes.DATE,
    chamber: DataTypes.INTEGER,
    gender: DataTypes.INTEGER
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};