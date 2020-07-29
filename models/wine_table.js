const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Wine = sequelize.define("Wine", {
        wineName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'uniqueWine',
            validate: {
                len: [1]
            }
        },
        year: {
            type: DataTypes.STRING,
            unique: 'uniqueWine',
            notEmpty:false
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