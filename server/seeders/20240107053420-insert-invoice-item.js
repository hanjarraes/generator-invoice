module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tb_invoice_items', [
      {
        invoice_id: 1, 
        name: 'Product A',
        description: 'Product Invoice',
        price: 100,
        quantity: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        invoice_id: 1, 
        name: 'Product B',
        description: 'Product Invoice',
        price: 150,
        quantity: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        invoice_id: 2, 
        name: 'Service X',
        description: 'Product Invoice',
        price: 80,
        quantity: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        invoice_id: 2, 
        name: 'Service Y',
        description: 'Product Invoice',
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
