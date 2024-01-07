'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_users_role', [
      {
        role: 'Admin',
        description: 'Administrator role',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role: 'User',
        description: 'Regular user role',
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
