module.exports = (sequelize, DataTypes) => {
    const UserLog = sequelize.define("user_log", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      activity: {
        type: DataTypes.STRING
      }
    });
  
    UserLog.associate = (models) => {
      UserLog.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return UserLog;
  };
  