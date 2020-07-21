module.exports = function (sequelize, DataTypes) {
    var Company = sequelize.define("Company", {
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

    Company.associate = function (models) {
        Company.hasMany(models.Restaurant, {
            onDelete: "cascade"
        });
    };
    return Company;
};