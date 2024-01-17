
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_role_module', [
      {
        users_role_id: 1,
        module: 'Dashboard',
        description: 'Dashboard displays whether invoice data is OK or not',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        users_role_id: 1, 
        module: 'Data Invoice',
        description: 'Invoice Data displays Invoice Data and also Inoive Creation etc',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        users_role_id: 1,
        module: 'User Management',
        description: 'User Data displays User Data and also User Creation etc',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        users_role_id: 2,
        module: 'Dashboard',
        description: 'Dashboard displays whether invoice data is OK or not',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        users_role_id: 2, 
        module: 'Data Invoice',
        description: 'Invoice Data displays Invoice Data and also Inoive Creation etc',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        users_role_id: 3,
        module: 'Dashboard',
        description: 'Dashboard displays whether invoice data is OK or not',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        users_role_id: 3, 
        module: 'Data Invoice',
        description: 'Invoice Data displays Invoice Data and also Inoive Creation etc',
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
