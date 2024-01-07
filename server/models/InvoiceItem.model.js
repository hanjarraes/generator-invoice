const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class InvoiceItem extends Model {
    static associate(models) {
      // Tidak ada asosiasi yang didefinisikan dalam migration
    }
  }

  InvoiceItem.init({
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
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
    modelName: 'InvoiceItem',
    tableName: 'tb_invoice_items',
    timestamps: false, // Atur timestamps sesuai dengan struktur di migration
  });

  return InvoiceItem;
};
