module.exports = (sequelize, DataTypes) => {
    const InvoiceStatus = sequelize.define("invoice_status", {
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
  