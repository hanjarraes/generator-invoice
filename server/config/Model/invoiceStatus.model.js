module.exports = (sequelize, DataTypes) => {
    const InvoiceStatus = sequelize.define("InvoiceStatus", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.STRING
      }
    });
  
    InvoiceStatus.associate = (models) => {
      InvoiceStatus.belongsTo(models.Invoice, {
        foreignKey: 'invoice_id',
        onDelete: 'CASCADE'
      });
    };
  
    return InvoiceStatus;
  };
  