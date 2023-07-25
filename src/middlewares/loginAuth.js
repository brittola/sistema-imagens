const jwt = require('jsonwebtoken');
const secret = require('../jwt/secret');

const loginAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.sendStatus(401);
        } else {
            req.body.userId = decodedToken.id;
            next();
        }
    });
};

module.exports = loginAuth;
