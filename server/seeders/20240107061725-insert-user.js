const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('hanjar201200', 10); 
    return queryInterface.bulkInsert('users', [
      {
        user_role_id: 1, 
        email: 'hanjarraess@gmail.com',
        name: 'Muhammad Hanjarraes',
        username: 'hanjarraes',
        password: hashedPassword,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_role_id: 2, 
        email: 'vg4615156@gmail.com',
        name: 'hanjarraes',
        username: 'admin',
        status: 'active',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
