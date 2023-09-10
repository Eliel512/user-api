const mongoose = require('mongoose'), { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
// const isValidObjectId = require('../../tools/isValidObjectId');

const userSchema = new Schema({
    // isValid: {
    //     type: Boolean,
    //     required: [true, 'Le champ \'isValid\' est requis.'],
    //     default: false
    // },
    connected_at: {
        type: Date,
        required: false
    },
    fname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Le champ \'fname\' est requis.']
    },
    lname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Le champ \'lname\' est requis.']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'L\'adresse email est requise'],
        validate: {
            validator: v => validator.isEmail(v),
            message: 'Email invalide'
        },
        set: v => validator.normalizeEmail(v),
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false,
    }
}, { timestamps: { createdAt: 'joinedAt' } });

userSchema.plugin(uniqueValidator);

const User = mongoose.model('users', userSchema);

module.exports = User;