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
    res.send(result);
}

exports.getAddress = async (req, res) => {
    let result = await models.Event.findOne({
        where: {id : req.query.id}
    });
    res.send(result);
}

exports.like = async (req, res) => {
    console.log("like");
    let obj = {
        user_id : req.body.user_id,
        event_id : req.body.event_id
    }
    let result = await models.Like.create(obj);
}

exports.dislike = async (req, res) => {
    console.log("dislike");
    let result = await models.Like.destroy({where: {user_id : req.body.user_id, event_id : req.body.event_id}});
}

exports.likeinfo = async (req, res) => {
    if (req.body.event_id == undefined) {
        let result = await models.Like.findAll({where: {user_id : req.body.user_id}});
        let ls = [];
        for (let i = 0; i<result.length; i++) {
            let event = await models.Event.findOne({where : {id : result[i].event_id}});
            console.log(event);
            ls.push({'id' : event.id, 'title' : event.title, 'filename' : event.filename});
        }
        res.send(ls);
    } else {
        let result = await models.Like.findOne({where: {user_id : req.body.user_id, event_id : req.body.event_id}});
        res.send(result);
    }
}