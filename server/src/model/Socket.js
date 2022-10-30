const Socket = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'socket',
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
            nickname: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT('medium'),
                allowNull: false
            }
        },
        {
            timestamps: true,
            tableName: 'socket',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = Socket;