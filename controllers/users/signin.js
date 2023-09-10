const User = require('../../models/user.model');
// const Role = require('../../models/users/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    User.findOne({ email: req.body.email }, { joinedAt: 0, __v: 0 })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé !' });
            }
            // if (!user.isValid) {
            //     return res.status(401).json({
            //         message: 'Veuillez valider votre adresse mail avant de vous connecter.'
            //     });
            // }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ message: 'Mot de passe incorrect !' });
                    }
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
                .catch(() => res.status(400).json({
                    message: 'Vérifiez la validité des données.'
                }));
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({
            message: 'Vérifiez la validité des données.'
        })
    });
};