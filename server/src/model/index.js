const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Event = require("./Event")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);

module.exports = db;