const Joi = require('joi');

const signupSchema = Joi.object({
    fname: Joi.string()
        .min(2)
        .required(),

    lname: Joi.string()
        .min(2)
        .required(),

    email: Joi.string()
        .required(),
    // .email({ minDomainSegments: 2, allowFullyQualified: true })
    // .min(5)

    password: Joi.string()
        .min(8)
        .required()
});

module.exports = (req, res, next) => {
    const { error, value } = signupSchema.validate({
        fname: req.body.firstName,
        lname: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    if (error) {
        console.log(error.details);
        return res.status(400).json(error.details);
    }
    next();
};