module.exports = (sequelize, DataTypes) => {
    const InvoiceItem = sequelize.define("InvoiceItem", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER
      }
    });
  
    InvoiceItem.associate = (models) => {
      InvoiceItem.belongsTo(models.Invoice, {
        foreignKey: 'invoice_id',
        onDelete: 'CASCADE'
      });
    };
  
    return InvoiceItem;
  };
  