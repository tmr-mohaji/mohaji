const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    req.decoded = jwt.verify(req.headers.authorization, process.env.secret);
    next();
}