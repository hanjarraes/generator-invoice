const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const db = {};

// Model
db.Invoice = require('./invoce.model.js')(sequelize, DataTypes);
db.InvoiceCurrency = require('./InvoiceCurrency.model.js')(sequelize, DataTypes);
db.InvoiceItem = require('./InvoiceItem.model.js')(sequelize, DataTypes);
db.InvoiceStatus = require('./invoiceStatus.model.js')(sequelize, DataTypes);

db.User = require('./User.model.js')(sequelize, DataTypes);
db.RoleModule = require('./RoleModule.model.js')(sequelize, DataTypes);
db.UserRole = require('./UserRole.model.js')(sequelize, DataTypes);
db.UserLog = require('./UserLog.model.js')(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sinkronisasi model dengan database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Sinkronisasi model dengan database berhasil.');
  })
  .catch((err) => {
    console.error('Terjadi kesalahan saat sinkronisasi:', err);
  });


module.exports = db;