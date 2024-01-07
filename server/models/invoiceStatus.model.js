'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class InvoiceStatus extends Model {
    static associate(models) {
      // Tidak ada asosiasi yang didefinisikan dalam migration
    }
  }
  
  InvoiceStatus.init({
    status: DataTypes.STRING,
    description: DataTypes.STRING,
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
    modelName: 'InvoiceStatus',
    tableName: 'tb_invoice_status',
    timestamps: false, // Atur timestamps sesuai dengan struktur di migration
  });

  return InvoiceStatus;
};
