const jwt = require('jsonwebtoken');
const secret = 'JWT-SECRET-KEY';

exports.verifyToken = (req, res, next) => {
    req.decoded = jwt.verify(req.headers.authorization, secret);
    next();
}