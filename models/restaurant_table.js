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

    // Restaurant.associate = function (models) {
    //     Restaurant.hasOne(models.Inventory, {
    //         onDelete: "cascade"
    //     });
    //     Restaurant.hasMany(models.Wine, {
    //         onDelete: "cascade"
    //     });
    // };
    return Restaurant;
};