module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define("Invoice", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      invoiceNo: {
        type: DataTypes.STRING
      },
      billFrom: {
        type: DataTypes.STRING
      },
      billFromAddress: {
        type: DataTypes.STRING
      },
      billFromEmail: {
        type: DataTypes.STRING
      },
      billTo: {
        type: DataTypes.STRING
      },
      billToAddress: {
        type: DataTypes.STRING
      },
      billToEmail: {
        type: DataTypes.STRING
      },
      currentDate: {
        type: DataTypes.DATE
      },
      dateOfIssue: {
        type: DataTypes.DATE
      },
      discountAmount: {
        type: DataTypes.INTEGER
      },
      discountRate: {
        type: DataTypes.INTEGER
      },
      notes: {
        type: DataTypes.STRING
      },
      subTotal: {
        type: DataTypes.INTEGER
      },
      taxAmount: {
        type: DataTypes.INTEGER
      },
      taxRate: {
        type: DataTypes.INTEGER
      },
      total: {
        type: DataTypes.INTEGER
      },
    });
  
    return Invoice;
  };
  