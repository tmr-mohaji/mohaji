const models = require("../model");

exports.getEvent = async (req, res) => {
    const { city } = req.query;
    console.log("city", city);

    let query = `select * from event where address like '%${city}%'`;
    let result = await models.Event.sequelize.query(query);
    console.log(result[0]);
    res.send(result[0]);
}