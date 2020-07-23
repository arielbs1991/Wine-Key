const Sequelize = require("sequelize");
const sequelize = require("./index");

const Inventory = require("./inventory_table");
const inventory_table = require("./inventory_table");

module.exports = function (sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
        Restaurant.hasOne(models.Inventory, {
            onDelete: "cascade"
        });
        Restaurant.belongsToMany(models.Wine, {
            as: Inventory,
            through: inventory_table,
            // foreignKey: RestaurantId,
            onDelete: "cascade"
        });
    };
    return Restaurant;
};

// module.exports = Restaurant;