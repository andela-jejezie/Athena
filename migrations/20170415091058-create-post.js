'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull:false,
        type: Sequelize.STRING
      },
      content: {
        allowNull:false,
        type: Sequelize.STRING
      },
      tags: {
        allowNull:false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      likes: {
        type: Sequelize.INTEGER
      },
      dislikes: {
        type: Sequelize.INTEGER
      },
      likers:{
        type:Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue:[]
      },
      dislikers:{
        type:Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue:[]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ownerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'ownerId',
        },
      },
    }),
  down:(queryInterface, Sequelize) =>
     queryInterface.dropTable('Posts'),
};