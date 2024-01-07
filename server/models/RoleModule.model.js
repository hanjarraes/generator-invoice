'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RoleModule extends Model {
    static associate(models) {
      // Tidak ada asosiasi yang didefinisikan dalam migration
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'RoleModule',
    tableName: 'tb_role_module',
    timestamps: false, // Atur timestamps sesuai dengan struktur di migration
  });

  return RoleModule;
};
