
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_invoice_status', [
      {
        status: 'Pending',
        description: 'Invoice is pending',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status: 'Paid',
        description: 'Invoice has been paid',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status: 'Cancelled',
        description: 'Invoice has been cancelled',
        created_at: new Date(),
        updated_at: new Date()
      }
      // Add more data as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Clear the entire table
    return queryInterface.bulkDelete('tb_invoice_status', null, {});
  }
};
