'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('assignments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            student_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,

            },
            homework_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            submitted: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('assignments');
    }
};