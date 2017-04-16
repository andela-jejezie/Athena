'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      tokens:{
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      isVerified:{
        type:Sequelize.BOOLEAN
      },
      gender: {
        type: Sequelize.STRING
      },
      password:{
        allowNull:false,
        type:Sequelize.STRING
      },
      email:{
        // unique: true,
        allowNull:false,
        type:Sequelize.STRING
      },
      social_capital: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Users')
};