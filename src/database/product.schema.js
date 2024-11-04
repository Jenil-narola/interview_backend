const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class products extends Model {
        static associate (models) {
        }
    }

    products.init(
        {
            id: {
                type: DataTypes.INTEGER,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            productViewed: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            deletedDate: {
                type: DataTypes.DATE,
                allowNull: true
            },

        },
        {
            sequelize,
            modelName: "products",
            freezeTableName: true,
        }
    );
    return products;
}; 
