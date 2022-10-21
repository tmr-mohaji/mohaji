const models = require("../model");

// 메인 페이지 갤러리
exports.getMain = async (req, res) => {
    const { type } = req.query;

    if (type == "전체") {
        let result = await models.Event.findAll();
        res.send(result);
    } else {
        let query = `select * from event where type like '%${type}%'`;
        let result = await models.Event.sequelize.query(query);
        res.send(result[0]);
    }
}

exports.getEvent = async (req, res) => {
    const { city } = req.query;

    if (city == "전체") {
        let result = await models.Event.findAll();
        res.send(result);
    } else {
        let query = `select * from event where address like '%${city}%'`;
        let result = await models.Event.sequelize.query(query);
        // console.log(result[0]);
        res.send(result[0]);
    }
}

exports.getAddress = async (req, res) => {
    let result = await models.Event.findOne({
        where: {id : req.query.id}
    });
    res.send(result);
}