const models = require("../model");

exports.getEvent = async (req, res) => {
    let result = await models.Event.findAll();
    console.log(result);
    res.send(result);
}