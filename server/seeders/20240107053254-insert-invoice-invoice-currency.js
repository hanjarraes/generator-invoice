'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_invoice_currency', [
      {
        currency: 'USD',
        description: 'United States Dollar',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency: 'EUR',
        description: 'Euro',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency: 'GBP',
        description: 'British Pound Sterling',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tb_invoice_currency', null, {});
  }
};

