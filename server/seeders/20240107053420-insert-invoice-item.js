module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tb_invoice_items', [
      {
        invoice_id: 1, 
        name: 'Product A',
        price: 100,
        quantity: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        invoice_id: 1, 
        name: 'Product B',
        price: 150,
        quantity: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        invoice_id: 2, 
        name: 'Service X',
        price: 80,
        quantity: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        invoice_id: 2, 
        name: 'Service Y',
        price: 120,
        quantity: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_invoice_items', null, {});
  }
};
