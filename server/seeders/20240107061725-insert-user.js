const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('hanjar201200', 10); 
    return queryInterface.bulkInsert('users', [
      {
        user_role_id: 1, 
        email: 'hanjarraess@gmail.com',
        username: 'hanjarraes',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_role_id: 2, 
        email: 'vg4615156@gmail.com',
        username: 'admin',
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
