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

// 이벤트 페이지 필터링 결과
exports.getEvent = async (req, res) => {

    let { city, type, date } = req.query;

    if (city == "전체") city='';
    if (type == "전체") type='';

    console.log(date);

    if (date == '') {
        let query = `select * from event where address like '%${city}%' and type like '%${type}%'`;
        let result = await models.Event.sequelize.query(query);
        res.send(result[0]);
    } else {
        let query = `select * from event where address like '%${city}%' and type like '%${type}%' and start_date <= '${date}' and end_date >= '${date}'`;
        let result = await models.Event.sequelize.query(query);
        res.send(result[0]);
    }
}

// 이벤트 상세 페이지
exports.getDetail = async (req, res) => {
    let result = await models.Event.findOne({
        where: {id : req.query.id}
    });
    console.log(result);
    res.send(result);
}

exports.getAddress = async (req, res) => {
    let result = await models.Event.findOne({
        where: {id : req.query.id}
    });
    res.send(result);
}

exports.like = async (req, res) => {
    
}