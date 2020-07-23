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
            allowNull: false,
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
    
    Wine.associate = function(models) {
        Wine.belongsTo(models.Inventory, {
          foreignKey: {
            allowNull: false
          }
        });

      };
    return Wine;
};