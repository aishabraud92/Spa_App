'use strict';
module.exports = (sequelize, DataTypes) => {
  var appoinments = sequelize.define('appoinments', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    nextnotice: DataTypes.DATE
  });
  appoinments.associate = function(models) {
  };
  return appoinments;
};
