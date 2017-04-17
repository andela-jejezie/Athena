const User = require('../models').User;
var Post = require('../models').Post;
const _ = require('lodash');
const helper = require('../util/helper');
const userController = {
    getUserById(req, res) {
        return User
        .findById(req.params.id)
        .then((user) => {
            let formattedUser = helper.userInfo(user);
            res.status(201).send({status:1, user:formattedUser});
        })
        .catch((error) => res.status(404).send({status:0, error:error}));
    },

    upvoteUser(req, res) {
        return User
            .findById(req.params.id)
            .then((user) => {
                user.increment('social_capital');
                res.status(201).send({status:1, user:user});
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    },
    downVoteUser(req, res) {
        return User
            .findById(req.params.id)
            .then((user) => {
                user.decrement('social_capital');
                res.status(201).send({status:1, user:user});
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    }
}

module.exports = {userController};