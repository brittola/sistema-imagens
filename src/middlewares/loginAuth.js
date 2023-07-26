const jwt = require('jsonwebtoken');
const secret = require('../jwt/secret');

const loginAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.sendStatus(401);
        } else {
            // salvando em req.body não estava chegando ao ImageService
            res.locals.userId = decodedToken.id;
            next();
        }
    });
};

module.exports = loginAuth;
