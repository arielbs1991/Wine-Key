const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Wine = sequelize.define("Wine", {
        wineName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'uniqueWine',
            // unique: 'uniqueInventory',
            validate: {
                len: [1]
            }
        },
        year: {
            type: DataTypes.INTEGER,
            unique: 'uniqueWine',
            // unique: 'uniqueInventory',
            validate: {
                len: [1, 4]
            }
        }
    });

    Wine.associate = function (models) {
        Wine.hasMany(models.Inventory, {
            foreignKey: 'wineId',
            unique: 'uniqueInventory',
            onDelete: 'cascade'
        });
    };
    return Wine;
};