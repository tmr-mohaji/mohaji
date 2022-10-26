const models = require("../model");

exports.writeComment = async (req, res) => {

    console.log(req.body);
    console.log(req.file);

    const {user_id, event_id, score, content} = req.body;

    let obj = {
        user_id : user_id,
        event_id : event_id,
        score : score,
        content : content
    }

    const result = await models.Review.create(obj);
    const img_result = await models.ReviewImg.create({review_id : result.id, filename : req.file.filename})
    res.send(true);
}