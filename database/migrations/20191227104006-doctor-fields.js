"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "firstName",
          { type: Sequelize.STRING },
          {
            transaction: t
          }
        ),
        queryInterface.addColumn(
          "Users",
          "lastName",
          { type: Sequelize.STRING },
          {
            transaction: t
          }
        ),
        queryInterface.addColumn(
          "Users",
          "middleName",
          { type: Sequelize.STRING },
          {
            transaction: t
          }
        ),
        queryInterface.addColumn(
          "Users",
          "position",
          { type: Sequelize.STRING },
          {
            transaction: t
          }
        ),
        queryInterface.addColumn(
          "Users",
          "employmentDate",
          { type: Sequelize.DATE },
          {
            transaction: t
          }
        ),
        queryInterface.addColumn(
          "Users",
          "room",
          { type: Sequelize.INTEGER },
          {
            transaction: t
          }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Users", "firstName", { transaction: t }),
        queryInterface.removeColumn("Users", "lastName", { transaction: t }),
        queryInterface.removeColumn("Users", "middleName", { transaction: t }),
        queryInterface.removeColumn("Users", "position", { transaction: t }),
        queryInterface.removeColumn("Users", "employmentDate", {
          transaction: t
        }),
        queryInterface.removeColumn("Users", "room", { transaction: t })
      ]);
    });
  }
};
