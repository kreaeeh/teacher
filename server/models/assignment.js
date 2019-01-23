'use strict';
module.exports = (sequelize, DataTypes) => {
  const assignment = sequelize.define('assignment', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    student_id: DataTypes.INTEGER,
    homework_id: DataTypes.INTEGER,
    submitted: DataTypes.BOOLEAN
  }, {});
    sequelize.sync()
        .then(() => console.log('Assignment table has been successfully created, if one doesn\'t exist'))
        .catch(error => console.log('This error occured', error));
  assignment.associate = function(models) {
    // associations can be defined here
  };
  return assignment;
};