'use strict';
const jwt = require('jsonwebtoken')
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require('bcryptjs'));
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lastname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    tokens: { 
        type: DataTypes.ARRAY(Sequelize.STRING)
    },
    email:{
      type:DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    gender: {
      type:DataTypes.STRING,
      allowNull:false
    },
    isVerified: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    social_capital: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Post, {
          foreignKey:'ownerId',
          as: 'posts'
        });
      },
      findByToken:(token) => {
        var decoded;
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
        }catch (e) {
          return Promise.reject();
        }
        return User.findOne({
          where:{
            id: decoded.id,
            tokens:{
              $contains:[token]
            }
          }
                   
        });
      },
      login:(email, password) => {
        return User.findOne({where:{email:email}}
        ).then((user) => {
          if(!user) {
            return sequelize.Promise.reject("not modified");
          }
          return new sequelize.Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) =>{
              if(res){
                resolve(user);
              }else {
                reject();
              }
            })
          })
        })
      }
    },
    instanceMethods: {
      removeToken:(token) => {
        const user = this;
        var tokens = user.tokens;
        tokens = tokens.filter((item) => { 
          return item !== token
        });
        return user.update({
          tokens:tokens
        });
      }
    },
    hooks:{
      beforeCreate:(user, options, next) => {
        if(!user.changed('password')) {
          return sequelize.Promise.reject("not modified");
        }
        return bcrypt.genSalt(10, (err, salt) => {
          return bcrypt.hash(user.password, salt, (error, hash) => {
            user.password = hash;
            next();
          })
        })
      }
    }
  });
  return User;
};