'use strict';
module.exports = (sequelize, DataTypes) => {
  var appointment = sequelize.define('appointment', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return appointment;
};