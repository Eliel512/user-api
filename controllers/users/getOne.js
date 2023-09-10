const User = require('../../models/user.model');

module.exports = (req, res, next) => {
    const userId = res.locals.userId;

    User.findById(userId, '_id fname lname email imageUrl')
        .then(user => {
            if(!user){
                return res.status(500).json({ message: 'Une erreur est survenue' });
            }
            res.status(200).json({
                _id: user._id,
                firstName: user.fname,
                lastName: user.lname,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                imageUrl: user.imageUrl
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};