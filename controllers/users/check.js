const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

module.exports = async (req, res) => {
    const { type } = req.body;
    switch (type) {
        case 'token':
            try {
                const token = req.body.token;
                const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            } catch {
                return res.status(404).json({ found: false });
            }
            break;
        case 'email':
            const userExists = await User.exists({ email: req.body.email });
            if (!userExists) {
                return res.status(404).json({ found: false });
            }
            break;
        default:
            return res.status(400).json({ message: '\'type\' incorrect.' })
    }
    return res.status(200).json({ found: true });
};