module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
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
    
    // Inventory.associate = function (models) {
    //     Inventory.hasMany(models.Wine, {
    //         onDelete: "cascade"
    //     });
    //     Inventory.belongsTo(models.Restaurant, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //       });
    // };
    return Inventory;
};