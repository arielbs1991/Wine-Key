module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
      // Giving the Group model a name of type STRING
      restaurantName: DataTypes.STRING
    });
  
    Group.associate = function(models) {
      // Associating Group with Posts
      // When an Group is deleted, also delete any associated Restaurants
      Group.hasMany(models.Restaurant, {
        onDelete: "cascade"
      });
    };
  
    return Group;
  };
  
  