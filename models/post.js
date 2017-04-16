'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    content: {
      type:DataTypes.STRING,
      allowNull:false
    },
    tags:{
      type: DataTypes.ARRAY(Sequelize.STRING),
      allowNull:false
    },
    images: {
      type:DataTypes.ARRAY(Sequelize.STRING),
      allowNull:true
    },
    likes: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    dislikes: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    likers:{
      type: DataTypes.ARRAY(Sequelize.INTEGER),
      allowNull:false,
      defaultValue:[]
    },
    dislikers:{
      type: DataTypes.ARRAY(Sequelize.INTEGER),
      allowNull:false,
      defaultValue:[]
    }
  }, {
    classMethods: {
      associate: (models) => {
        Post.belongsTo(models.User, {
          foreignKey:'ownerId',
          onDelete:'CASCADE',
        });
        Post.hasMany(models.Comment, {
          foreignKey:'postId',
          as: 'comments'
        });
      },
    },
  });
  return Post;
};