'use strict';
module.exports = (sequelize, DataTypes) => {
  var appointment = sequelize.define('appointment', {
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    course: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });
      appointment.associate = function(models) {
       models.appointment.belongsTo(models.user);
     };
  return appointment;
};
