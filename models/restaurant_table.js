const inventory_table = require("./inventory_table");

module.exports = function (sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
        // uuid: {
        //     type: sequelize.UUID,
        //     primaryKey: true
        // },
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
            through: inventories,
            onDelete: "cascade"
        });
    };
    return Restaurant;
};