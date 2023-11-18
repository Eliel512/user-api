const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const value = {
        ...res.locals.value
    };
    if(value.password && typeof value.password == 'string'){
        value.password = bcrypt.hashSync(value.password, 10);
    }

    User.findOneAndUpdate({
        _id: res.locals.userId }, { $set: { ...value } },
        { new: true, projection: { __v: 0, password: 0 }
    })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
}