const models = require("../model");

exports.postEvent = async (req, res) => {
    const { user_id, event_id, date } = req.body;
    
    let obj = {
        user_id : user_id,
        event_id : event_id,
        date : date
    }

    let query = `select * from event where id = '${event_id}' and start_date <= '${date}' and end_date >= '${date}'`
    let event = await models.sequelize.query(query);
    
    if (event[0].length > 0) {
        await models.Schedule.create(obj);
        res.send("성공적으로 이벤트를 등록하였습니다.");
    } else {
        res.send("이벤트 일정을 다시 확인해주세요.");
    }
}

exports.getEvent = async (req, res) => {
    let result = await models.Schedule.findAll({where: {user_id : req.query.user_id}});
    console.log(result);
    let ls = [];
    for (let i = 0; i<result.length; i++) {
        let event = await models.Event.findOne({where : {id : result[i].event_id}});
        ls.push({'id' : event.id, 'title' : event.title, 'date' : result[i].date});
    }
    res.send(ls);
}

exports.deleteEvent = async (req, res) => {
    let result = await models.Schedule.destroy({where: {event_id : req.query.id}});
    res.send(true);
}

