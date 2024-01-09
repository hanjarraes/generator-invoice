
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class InvoiceCurrency extends Model {
    static associate(models) {
   
    }
  }
  
  InvoiceCurrency.init({
    currency: DataTypes.STRING,
    description: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'InvoiceCurrency',
    tableName: 'tb_invoice_currency',
    timestamps: false, 
  });

  return InvoiceCurrency;
};
