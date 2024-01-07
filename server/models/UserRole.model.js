const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserRole extends Model {
    static associate(models) {
      // Tidak ada asosiasi yang didefinisikan dalam migrasi
    }
  }

  UserRole.init({
    role: DataTypes.STRING,
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
    modelName: 'UserRole',
    tableName: 'tb_users_role',
    timestamps: true,
    underscored: true,
  });

  return UserRole;
};
