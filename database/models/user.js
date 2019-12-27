"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING, 
      lastName: DataTypes.STRING, 
      middleName: DataTypes.STRING,
      position: DataTypes.STRING, 
      employmentDate: DataTypes.DATE, 
      room: DataTypes.INTEGER, 
    },
    {
      hooks: {
        beforeSave: (user) => {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
