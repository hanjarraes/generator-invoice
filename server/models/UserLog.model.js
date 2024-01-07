'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserLog extends Model {
    static associate(models) {
      // Tidak ada asosiasi yang didefinisikan dalam migration
    }
  }

  UserLog.init({
    user_id: {
      type: DataTypes.INTEGER,
    },
    activity: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'UserLog',
    tableName: 'users_log',
    timestamps: false,
  });

  return UserLog;
};
