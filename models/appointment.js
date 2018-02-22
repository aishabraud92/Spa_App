'use strict';
module.exports = (sequelize, DataTypes) => {
  var appointment = sequelize.define('appointment', {
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    spa: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return appointment;
};
