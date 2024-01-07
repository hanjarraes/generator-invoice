
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('role_module', [
      {
        module: 'Module A',
        description: 'Description for Module A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        module: 'Module B',
        description: 'Description for Module B',
        created_at: new Date(),
        updated_at: new Date()
      },
      // Add more data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role_module', null, {});
  }
};
