const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Wine = sequelize.define("Wine", {
        wineName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        year: {
            type: DataTypes.INTEGER,
            //gonna have to allow year to be null
            allowNull: true,
            validate: {
                len: [1, 4]
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
        Wine.hasMany(models.Inventory, { foreignKey: 'wineId' });
    };
    return Wine;
};