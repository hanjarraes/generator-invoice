module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users_role',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
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
    tableName: 'users',
    timestamps: true,
    underscored: true 
  });

  User.associate = (models) => {
    User.belongsTo(models.UserRole, {
      foreignKey: 'user_role_id',
      onDelete: 'CASCADE'
    });
  };

  return User;
};
