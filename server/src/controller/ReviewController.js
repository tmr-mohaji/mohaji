const models = require("../model");

exports.writeComment = async (req, res) => {

    console.log(req.body);

    const {user_id, event_id, score, comment} = req.body;

    let obj = {
        user_id : user_id,
        event_id : event_id,
        score : score,
        content : comment
    }

    const result = await models.Review.create(obj);
    console.log(result);
    res.send(true);
}