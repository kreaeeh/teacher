'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addConstraint('assignments', ['homework_id'], {
          type: 'foreign key',
          name: 'homewrok_id_fk',
          references: { //Required field
              table: 'homework',
              field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('assignments','homewrok_id_fk')
  }
};
