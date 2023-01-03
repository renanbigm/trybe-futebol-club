'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      teamName: {
        allowNull: false,
        type: Sequelize.STRING(30),
        field: 'team_name',
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
};
