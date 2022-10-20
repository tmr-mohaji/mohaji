const models = require("../model");

// 회원가입
exports.postSignup = async (req, res) => {

    const {id, password, nickname, email} = req.body;

    let obj = {
        id : id,
        password : password,
        nickname : nickname,
        email : email
    }

    let result = await models.User.create(obj);
    res.send(result);
}

// 아이디 중복 확인
exports.idCheck = async (req, res) => {

    let result = await models.User.findAll({
        where: {id : req.body.id}
    });

    // true : 유효한 아이디, false : 중복 아이디
    if (result.length == 0) {
        res.send(true);
    } else {
        res.send(false);
    }
}

// 이메일 중복 확인
exports.emailCheck = async (req, res) => {

    let result = await models.User.findAll({
        where: {email : req.body.email}
    });
    
    // true : 유효한 이메일, false : 중복 이메일
    if (result.length == 0) {
        res.send(true);
    } else {
        res.send(false);
    }
}

// 아이디 찾기
exports.findId = async (req, res) => {

    let result = await models.User.findOne({
        where: {email : req.body.email}
    });

    if (result == null) {
        res.send(false);
    } else {
        res.send(result.id);
    }
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

    let result = await models.User.findOne({
        where: {id : req.body.id, password : req.body.password}
    });

    // false : 로그인 실패 , true : 로그인 성공
    if (result == null) {
        res.send(false);
    } else {
        res.send(true);
    }
}