
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_role_module', [
      {
        users_role_id: 1,
        module: 'Module A',
        description: 'Description for Module A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        users_role_id: 2, 
        module: 'Module B',
        description: 'Description for Module B',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Menghapus semua data dari tabel
    return queryInterface.bulkDelete('tb_role_module', null, {});
  }
};