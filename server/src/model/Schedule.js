const Schedule = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'schedule',
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
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'schedule',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = Schedule;