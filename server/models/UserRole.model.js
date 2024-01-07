'use strict';
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
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
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
