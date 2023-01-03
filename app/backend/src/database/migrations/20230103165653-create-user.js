'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
