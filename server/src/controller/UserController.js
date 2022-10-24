const models = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = 'JWT-SECRET-KEY';

// 회원가입
exports.postSignup = async (req, res) => {

    const {id, password, nickname, email} = req.body;

    const doBcrypt = (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    }

    const hashedPassword = doBcrypt(password);

    let obj = {
        id : id,
        password : hashedPassword,
        nickname : nickname,
        email : email
    }

    let result = await models.User.create(obj);
    res.send({success: true});
}

// 아이디 중복 확인
exports.idCheck = async (req, res) => {

    let result = await models.User.findOne({
        where: {id : req.body.id}
    });

    console.log(result);

    if (result == null) {
        res.send({valid: true});
    } else {
        res.send({valid: false});
    }
}

// 이메일 중복 확인
exports.emailCheck = async (req, res) => {

    let result = await models.User.findOne({
        where: {email : req.body.email}
    });
    
    if (result == null) {
        res.send({valid: true});
    } else {
        res.send({valid: false});
    }
}

// 아이디 찾기
exports.findId = async (req, res) => {

    let result = await models.User.findOne({
        where: {email : req.body.email}
    });
    console.log(result);
    res.send({id: result});
}

// 비밀번호 재설정
exports.resetPW = async (req, res) => {

    let obj = {
        id : req.body.id,
        password : req.body.password
    };

    let result = await models.User.update(obj, {
        where: {id : req.body.id}
    });

    res.send(result)
}

// 로그인
exports.postLogin = async (req, res) => {

    const idResult = await models.User.findOne({
        where: {id : req.body.id}
    });
     
    if (idResult != null) {
        const result = await bcrypt.compare(req.body.password, idResult.password);

        if (result == true) {
            const token = jwt.sign({
                type : 'JWT',
                id : req.body.id,
                nickname: idResult.nickname
            }, secret);
            res.send({isLogin : true, token: token, nickname: idResult.nickname });
        } else {
            res.send({isLogin : false});
        }
    } else {
        res.send({isLogin : false});
    }
}

// 마이 페이지
exports.getInfo = async (req, res) => {
    const result = await models.User.findOne({
        where: {id : req.query.id}
    });
    res.send(result);
}

exports.getAuth = (req, res) => {
    res.send({id : req.decoded.id, nickname : req.decoded.nickname});
}