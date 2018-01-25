'use strict';
module.exports = (sequelize, DataTypes) => {
  var page = sequelize.define('page', {
    name: DataTypes.STRING,
    usedrId: DataTypes.INTEGER,
    nextnotice: Datatypes.DATE
  });
  page.associate = function(models){
  };
  return pages;
};
