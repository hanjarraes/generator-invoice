const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class InvoiceStatus extends Model {
    static associate(models) {

    }
  }
  
  InvoiceStatus.init({
    status: DataTypes.STRING,
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
    modelName: 'InvoiceStatus',
    tableName: 'tb_invoice_status',
    timestamps: false, 
  });

  return InvoiceStatus;
};
