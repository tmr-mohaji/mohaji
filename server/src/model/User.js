const User = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user',
        {
            id : {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: DataTypes.STRING(255),
            },
            nickname: {
                type: DataTypes.STRING(255),
            },
            email: {
                type: DataTypes.STRING(255),
            }
        },
        {
            timestamps: false,
            tableName: 'user',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User;