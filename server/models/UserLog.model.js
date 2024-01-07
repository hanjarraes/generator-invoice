const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserLog extends Model {
    static associate(models) {
      UserLog.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE', 
      });
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
      defaultValue: new Date(),
    },
  }, {
    sequelize,
    modelName: 'UserLog',
    tableName: 'users_log',
    timestamps: false,
  });

  return UserLog;
};
