const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../passport/GoogleStrategy.js');
require('../passport/kakaoStrategy.js');
const passport = require('passport');

router.all('/*', function( req, res, next) {
    res.header( "Access-Control-Allow-Origin", "*" );
    next();
});
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), function(req, res) {
    res.redirect(`${process.env.CLIENT_URL}?token=${setUserToken(req.user)}`);
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/auth',}), (req,res) => {
    res.redirect(`${process.env.CLIENT_URL}?token=${setUserToken(req.user)}`);
  }
);

function setUserToken(user) {
    console.log("user", user);
    const token = jwt.sign({id: user.id, nickname: user.nickname}, process.env.secret, {
        expiresIn: '60m', // 만료시간 15분
        issuer: '토큰발급자',
    });
    return token;
}

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(true);
});

module.exports = router;