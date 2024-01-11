
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tb_invoice_currency', [
      {
        currency: 'RP',
        description: 'Indonesia Rupiah',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency: 'SGD',
        description: 'Singapura Dolar',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency: 'USD',
        description: 'United States Dollar',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency: 'RM',
        description: 'Malaysia Ringgit',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tb_invoice_currency', null, {});
  }
};

