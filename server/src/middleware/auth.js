const jwt = require('jsonwebtoken');
const secret = 'JWT-SECRET-KEY';

exports.verifyToken = (req, res, next) => {
    console.log("work");
    req.decoded = jwt.verify(req.headers.authorization, secret);
    next();
}