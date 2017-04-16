'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
   queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      likers:{
        type:Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue:[]
      },
      dislikers:{
        type:Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue:[]
      },
      ownerId:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Posts',
          key: 'id',
          as: 'postId',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
     queryInterface.dropTable('Comments');
  }
};