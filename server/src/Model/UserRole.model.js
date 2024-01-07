module.exports = (sequelize, DataTypes) => {
  const UserLog = sequelize.define("user_role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_module_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'role_module',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users_role',
    timestamps: true,
    underscored: true 
  });

  UserLog.associate = (models) => {
    UserLog.belongsTo(models.RoleModule, {
      foreignKey: 'role_module_id',
      onDelete: 'CASCADE'
    });
    UserLog.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };

  return UserLog;
};
