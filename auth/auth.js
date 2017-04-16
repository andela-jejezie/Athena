var Sequelize = require('sequelize');
var User = require('../models').User;
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
        var access = 'auth';
        var token = jwt.sign({id:user.id.toString(16), access}, process.env.JWT_SECRET).toString();
        var tokens = [];
        if(user.tokens) {
            tokens = tokens.concat(user.tokens);
        }
        tokens.push(token);
        return user.update(
            {'tokens':tokens}
            ).then(() => {
            const picked_user = _.pick(user, ['email', 'firstname', 'lastname', 'gender', 'isVerified', 'social_capital', 'id', 'createdAt', 'updatedAt'])
            return {id_token:token,
                    user:picked_user,
                    status:1
                };
        });
      };

const authController = {
    authenticate(req, res, next) {
        var token = req.header('token');
        User.findByToken(token).then((user) => {
            if (!user) {
                return Promise.reject();
            }
            req.user = user;
            req.token = token;
            next();
        }).catch((e) => {
            res.status(401).send({status:0, message:'Unauthorized'});
        });
  },

    signUpWithEmail(req, res) {
        const body = _.pick(req.body, ['password','email', 'firstname', 'lastname', 'gender']);
        return User
            .create({
                firstname:body.firstname,
                lastname:body.lastname,
                gender:body.gender,
                email:body.email,
                password:body.password,
            }, {beforeCreate:true})
            .then((user) => {
                return generateAuthToken(user);
            })
            .then((userObject) => {
                res.status(201).send(userObject)
            })
            .catch((error) => res.status(400).send(error));
    },
    login(req, res) {
        const body = _.pick(req.body,['password', 'email']);
        return User.login(body.email, body.password).then((user) => {
            if(!user) {
                return res.status(404).send({
                    status:0,
                    error:"Not Found"
                });
            }
            return generateAuthToken(user);
        })
        .then((userObject) => {
            res.status(201).send(userObject);
        })
        .catch((error) => res.status(400).send(error));
    }
}
module.exports = {authController};