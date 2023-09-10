// const fs = require('fs');
const User = require('../../models/user.model');
// const Role = require('../../models/users/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                fname: req.body.firstName,
                lname: req.body.lastName,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    res.status(200).json({
                        _id: user._id,
                        firstName: user.fname,
                        lastName: user.lname,
                        email: user.email,
                        imageUrl: user.imageUrl,
                        token: jwt.sign(
                            { _id: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '48h' }
                        )
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ message: 'Erreur interne du serveur' });
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Erreur interne du serveur' })
        });
};