'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Invoice extends Model {
    static associate(models) {
      // Tidak ada asosiasi yang didefinisikan dalam migration
    }
  }
  
  Invoice.init({
    invoice_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoice_currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoiceNo: DataTypes.STRING,
    billFrom: DataTypes.STRING,
    billFromAddress: DataTypes.STRING,
    billFromEmail: DataTypes.STRING,
    billTo: DataTypes.STRING,
    billToAddress: DataTypes.STRING,
    billToEmail: DataTypes.STRING,
    currentDate: DataTypes.DATE,
    dateOfIssue: DataTypes.DATE,
    discountAmount: DataTypes.INTEGER,
    discountRate: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    subTotal: DataTypes.INTEGER,
    taxAmount: DataTypes.INTEGER,
    taxRate: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Invoice',
    timestamps: false, // Atur timestamps sesuai dengan struktur di migration
  });

  return Invoice;
};
