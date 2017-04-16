'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: {
      type:DataTypes.STRING,
      allowNull:false
    },
    image: {
      type:DataTypes.STRING,
    },
    ownerId: {
      type:DataTypes.INTEGER
    }

  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Post, {
          foreignKey:'postId',
          onDelete:'CASCADE'
        })
      }
    }
  });
  return Comment;
};