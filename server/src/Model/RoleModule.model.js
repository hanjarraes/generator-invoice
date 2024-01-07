module.exports = (sequelize, DataTypes) => {
    const RoleModule = sequelize.define("role_module", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      module: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
  
    RoleModule.associate = (models) => {
      RoleModule.belongsTo(models.UserRole, {
        foreignKey: 'role_id',
        onDelete: 'CASCADE'
      });
    };
  
    return RoleModule;
  };
  