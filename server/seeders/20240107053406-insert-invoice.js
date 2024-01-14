
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tb_invoice', [
      {
        invoice_status_id: 2,
        status: 'Paid',
        invoice_currency_id: 1,
        currency: 'USD',
        invoiceNo: '001/AN/I/2024',
        billFrom: 'Company A',
        billFromAddress: 'Address A',
        billFromEmail: 'companya@email.com',
        billTo: 'Customer X',
        billToAddress: 'Address X',
        billToEmail: 'customerx@email.com',
        currentDate: new Date(),
        dateOfIssue: new Date(),
        discountAmount: "50",
        discountRate: "10",
        notes: 'Invoice for services rendered',
        subTotal: "500",
        taxAmount: "50",
        taxRate: "10",
        total: "550",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        invoice_status_id: 1,
        status: 'Pending',
        invoice_currency_id: 2,
        currency: 'EUR',
        invoiceNo: '002/AN/I/2024',
        billFrom: 'Company B',
        billFromAddress: 'Address B',
        billFromEmail: 'companyb@email.com',
        billTo: 'Customer Y',
        billToAddress: 'Address Y',
        billToEmail: 'customery@email.com',
        currentDate: new Date(),
        dateOfIssue: new Date(),
        discountAmount: "0",
        discountRate: "0",
        notes: 'Invoice for products purchased',
        subTotal: "800",
        taxAmount: "80",
        taxRate: "10",
        total: "880",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_invoice', null, {});
  }
};
