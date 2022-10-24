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
db.Like = require("./Like")(sequelize, Sequelize);

// user(id) -> like(user_id)
db.User.hasMany(db.Like, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.Like.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});

// event(id) -> like(event_id)
db.Event.hasMany(db.Like, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.Like.belongsTo(db.Event, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});

module.exports = db;