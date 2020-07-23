
const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        wineName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 4]
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
        Inventory.belongsTo(models.Wine);
        Inventory.belongsTo(models.Restaurant, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Inventory;
};