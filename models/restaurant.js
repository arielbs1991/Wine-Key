module.exports = function (sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
        restaurantName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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
    });

    Restaurant.associate = function (models) {
        Restaurant.hasMany(models.Wine, {
            onDelete: "cascade"
        });
    };
    return Restaurant;
};