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
        res.send(true);
    } else {
        res.send(false);
    }
}

exports.getEvent = async (req, res) => {
    let result = await models.Schedule.findAll({where: {user_id : req.query.user_id}});
    console.log(result);
    let ls = [];
    for (let i = 0; i<result.length; i++) {
        let event = await models.Event.findOne({where : {id : result[i].event_id}});
        ls.push({'id' : event.id, 'title' : event.title, 'date' : result[i].date , 's_id': result[i].id});
    }
    res.send(ls);
}

exports.deleteEvent = async (req, res) => {
    let result = await models.Schedule.destroy({where: {event_id : req.query.id, id : req.query.s_id}});
    res.send(true);
    console.log('이거 백 결과 :' , result);
}

