module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_invoice', {
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
          key: 'id',
          onUpdate: 'CASCADE', 
          onDelete: 'CASCADE' 
        }
      },
      status: {
        type: Sequelize.STRING
      },
      invoice_currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_invoice_currency',
          key: 'id',
          onUpdate: 'CASCADE', 
          onDelete: 'CASCADE' 
        }
      },
      currency: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
      },
      discountRate: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      subTotal: {
        type: Sequelize.STRING
      },
      taxAmount: {
        type: Sequelize.STRING
      },
      taxRate: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('tb_invoice');
  }
};
