const Like = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'event_like',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            event_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'event_like',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = Like;