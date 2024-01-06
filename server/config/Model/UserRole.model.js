module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define("UserRole", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
  
    UserRole.associate = (models) => {
      UserRole.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return UserRole;
  };
  