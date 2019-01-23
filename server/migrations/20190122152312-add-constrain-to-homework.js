'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addConstraint('homework', ['teacher_id'], {
          type: 'foreign key',
          name: 'teacher_id_fk',
          references: { //Required field
              table: 'users',
              field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeConstraint('homework','teacher_id_fk')

  }
};
