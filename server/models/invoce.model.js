
  const { Model, DataTypes } = require('sequelize');

  module.exports = (sequelize) => {
    class Invoice extends Model {
      static associate(models) {
        Invoice.belongsTo(models.InvoiceStatus, { foreignKey: 'invoice_status_id' });
        Invoice.belongsTo(models.InvoiceCurrency, { foreignKey: 'invoice_currency_id' });
        Invoice.hasMany(models.InvoiceItem, { foreignKey: 'invoice_id' });
        
      }
    }
    
    Invoice.init({
      invoice_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: DataTypes.STRING,
      invoice_currency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: DataTypes.STRING,
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
        defaultValue: new Date(),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    }, {
      sequelize,
      modelName: 'Invoice',
      tableName: 'tb_invoice',
      timestamps: false, // Atur timestamps sesuai dengan struktur di migration
    });

    return Invoice;
  };
