const Event = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'event',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            url: {
                type: DataTypes.TEXT('medium'),
            },
            detail: {
                type: DataTypes.TEXT('medium'),
            },
            type: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            place: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            address: {
                type: DataTypes.TEXT('medium'),
                allowNull: false
            },
            start_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            time: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            people: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            filename: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            price: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'event',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = Event;