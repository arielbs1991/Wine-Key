const Sequelize = require("sequelize");
const sequelize = require("./index");

const Inventory = require("./inventory_table");
const inventory_table = require("./inventory_table");

module.exports = function (sequelize, DataTypes) {
    var Wine = sequelize.define("Wine", {
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
        },
        variety: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Wine.associate = function (models) {
        Wine.belongsTo(models.Inventory, {
            foreignKey: {
                InventoryId,
                allowNull: false
            }
        });
        Wine.hasMany(models.Restaurant, {
            as: Inventory,
            through: inventory_table,
            foreignKey: {
                RestaurantId,
                allowNull: false
            }
        });
    };
    return Wine;
};

// module.exports = Wine;