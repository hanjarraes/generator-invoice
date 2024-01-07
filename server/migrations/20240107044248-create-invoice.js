'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('tb_invoice', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      invoice_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_invoice_status',
          key: 'id'
        }
      },
      invoice_currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_invoice_currency',
          key: 'id'
        }
      },
      invoiceNo: {
        type: Sequelize.STRING
      },
      billFrom: {
        type: Sequelize.STRING
      },
      billFromAddress: {
        type: Sequelize.STRING
      },
      billFromEmail: {
        type: Sequelize.STRING
      },
      billTo: {
        type: Sequelize.STRING
      },
      billToAddress: {
        type: Sequelize.STRING
      },
      billToEmail: {
        type: Sequelize.STRING
      },
      currentDate: {
        type: Sequelize.DATE
      },
      dateOfIssue: {
        type: Sequelize.DATE
      },
      discountAmount: {
        type: Sequelize.INTEGER
      },
      discountRate: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      },
      subTotal: {
        type: Sequelize.INTEGER
      },
      taxAmount: {
        type: Sequelize.INTEGER
      },
      taxRate: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Invoices');
  }
};
