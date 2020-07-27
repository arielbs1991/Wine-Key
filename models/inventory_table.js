const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Inventory.associate = function (models) {
        Inventory.belongsTo(models.Wine, { foreignKey: 'wineId', onDelete: 'cascade' });
        Inventory.belongsTo(models.Restaurant, {
            foreignKey: 'restaurantId',
            onDelete: 'cascade'
        });
    };
    return Inventory;
};