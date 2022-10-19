const models = require("../model");

exports.postSignup = async (req, res) => {

    console.log(req.body);
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