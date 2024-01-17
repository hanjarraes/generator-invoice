
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_users_role', [
      {
        role: 'Super Admin',
        description: 'Full control, global configuration, system security.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role: 'Admin',
        description: 'Specific control, user management, maintenance.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role: 'User',
        description: 'Limited access rights, use the system according to permission.',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Clear the entire table
    return queryInterface.bulkDelete('tb_users_role', null, {});
  }
};
