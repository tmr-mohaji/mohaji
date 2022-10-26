const ReviewImg = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'review_img',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            review_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            filename: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'review_img',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = ReviewImg;