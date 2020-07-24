const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
        restaurantName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }

    });

    Restaurant.associate = function (models) {
        Restaurant.hasMany(models.Inventory, {
            foreignKey: 'restaurantId',
            onDelete: "cascade"
        });
    };
    return Restaurant;
};
