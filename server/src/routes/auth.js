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
    res.redirect(`http://localhost:3000?token=${setUserToken(req.user)}`);
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/auth',}), (req,res) => {
    setUserToken(res, req.user);
    res.redirect('/sucess');
  }
);

function setUserToken(user) {
    const token = jwt.sign({id: user.id}, process.env.secret, {
        expiresIn: '15m', // 만료시간 15분
        issuer: '토큰발급자',
    });
    return token;
    // res.cookie('token', token);
}

router.get('/success', (req, res) => {
    res.send("success");
})

module.exports = router;