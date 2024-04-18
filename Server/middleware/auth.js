const jwt = require('jsonwebtoken');
const { UserAuthModel } = require('../Models/UserLoginSchema');

const verifyToken = async (req, res, next) => {
    const user = JSON.parse(req.headers.authorization);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { token } = user;

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserAuthModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {

        return res.status(401).json({ message: 'Unauthorizeds' });
    }
};

module.exports = verifyToken;
