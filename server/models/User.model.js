const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.UserRole, { foreignKey: 'user_role_id' });
    }
  }

  User.init({
    user_role_id: {
      type: DataTypes.INTEGER,
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
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
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  });

  return User;
};
