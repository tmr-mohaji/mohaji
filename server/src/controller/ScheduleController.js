const models = require("../model");

exports.postEvent = async (req, res) => {
    const { user_id, event_id, date } = req.body;
    
    let obj = {
        user_id : user_id,
        event_id : event_id,
        date : date
    }

    let result = await models.Schedule.create(obj);
    
    if (result) {
        res.send("성공적으로 이벤트를 등록하였습니다.");
    }
}

exports.getEvent = async (req, res) => {
    let result = await models.Schedule.findAll({where: {user_id : req.query.user_id}});
    let ls = [];
    for (let i = 0; i<result.length; i++) {
        let event = await models.Event.findOne({where : {id : result[i].event_id}});
        ls.push({'id' : result[i].id, 'title' : event.title, 'date' : result[i].date});
    }
    res.send(ls);
}

exports.deleteEvent = async (req, res) => {
    let result = await models.Schedule.destroy({where: {id : req.query.id}});
    res.send(true);
}

