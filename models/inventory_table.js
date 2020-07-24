const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        wineId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Inventory.associate = function (models) {
        Inventory.belongsTo(models.Wine, { foreignKey: 'wineId' });
        Inventory.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
    };
    return Inventory;
};