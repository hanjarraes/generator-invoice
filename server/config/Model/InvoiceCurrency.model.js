module.exports = (sequelize, DataTypes) => {
    const InvoiceCurrency = sequelize.define("InvoiceCurrency", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      currency: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
  
    InvoiceCurrency.associate = (models) => {
      InvoiceCurrency.belongsTo(models.Invoice, {
        foreignKey: 'invoice_id',
        onDelete: 'CASCADE'
      });
    };
  
    return InvoiceCurrency;
  };
  