const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../passport/GoogleStrategy.js');
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), function(req, res) {
    setUserToken(res, req.user);
    res.redirect('/success');
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/auth',}), (req,res) => {
    setUserToken(res, req.user);
    res.redirect('/sucess');
  }
);

function setUserToken(res, user) {
    const token = jwt.sign({id: user.id}, process.env.secret, {
        expiresIn: '15m', // 만료시간 15분
        issuer: '토큰발급자',
    });
    console.log(token);
    // res.cookie('token', token);
}

router.get('/success', (req, res) => {
    res.send("success");
})

module.exports = router;