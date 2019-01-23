'use strict';
module.exports = (sequelize, DataTypes) => {
    const homework = sequelize.define('homework', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        teacher_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {});
    sequelize.sync()
        .then(() => console.log('Homework table has been successfully created, if one doesn\'t exist'))
        .catch(error => console.log('This error occured', error));
    homework.associate = function (models) {
        // associations can be defined here
    };
    return homework;
};