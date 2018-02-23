'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('appointments', 'userId', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('appointments', 'userId');
  }
};
