const models = require("../model");

exports.getEvent = async (req, res) => {
    console.log(req.query);
    city = req.query;
    let result = await models.Event.findAll();
    // console.log(result);
    res.send(result);
}