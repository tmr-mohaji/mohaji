const Review = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'review',
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
            score: {
                type: DataTypes.DECIMAL(3,2),
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT('medium'),
                allowNull: false
            }
        },
        {
            timestamps: true,
            tableName: 'review',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = Review;