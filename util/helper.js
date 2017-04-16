const _ = require('lodash');
exports.userInfo = (user) => {
    const formattedUser = _.pick(user, ['email', 'firstname', 'lastname', 'gender', 'isVerified', 'social_capital', 'id', 'createdAt', 'updatedAt']);
    return formattedUser;
};

exports.remove = (array, item) => {
    console.log('in helper', array);
    let val = array.filter((element) => { 
        return element !== item
    });
    console.log('in helper', val);
    return val;
};