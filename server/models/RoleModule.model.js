const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RoleModule extends Model {
    static associate(models) {
      RoleModule.belongsTo(models.UserRole, {
        foreignKey: 'users_role_id',
        onDelete: 'CASCADE',
      });
    }
  }
  
  RoleModule.init({
    users_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    module: DataTypes.STRING,
    description: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'RoleModule',
    tableName: 'tb_role_module',  
    timestamps: false, 
  });

  return RoleModule;
};
