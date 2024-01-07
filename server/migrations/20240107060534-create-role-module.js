module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_role_module', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      users_role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_users_role',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE' 
        }
      },
      module: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('tb_role_module');
  }
};
