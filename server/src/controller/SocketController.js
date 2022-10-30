const models = require("../model");

// 메세지 보내기
exports.postSend = async (req, res) => {
    const {user_id, nickname, message} = req.body;
    let obj = {
        user_id : user_id,
        nickname : nickname,
        message : message
    }
    const result = await models.Socket.create(obj);
    res.send(true);
}

// 메세지 불러오기
exports.get = async (req, res) => {
    const result = await models.Socket.findAll();
    console.log(result);
    res.send(result);
}