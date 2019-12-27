const db = require('../database/models');

exports.connect = function() {
    // const sequelize = new Sequelize({
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   dialect: "postgres"
    // });
  
    db.sequelize
      .authenticate()
      .then(() => console.log("Connection has been established successfully."))
      .catch(err => console.error("Unable to connect to the database:", err));
  };
