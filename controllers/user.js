const User = require('../models').User;
var Post = require('../models').Post;
const _ = require('lodash');
const helper = require('../util/helper');
const userController = {
    getUserById(req, res) {
        return User
        .findById(req.params.id)
        .then((user) => {
            console.log('########', user);
            let formattedUser = helper.userInfo(user);
            res.status(201).send(formattedUser);
        })
        .catch((error) => res.status(404).send(error));
    },

    upvoteUser(req, res) {
        return User
            .findById(req.params.id)
            .then((user) => {
                user.increment('social_capital');
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    },
    downVoteUser(req, res) {
        return User
            .findById(req.params.id)
            .then((user) => {
                user.decrement('social_capital');
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    }
}

module.exports = {userController};