'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password', 10);

    return queryInterface.bulkInsert('Users', [{
      name: 'Schuzao',
      email: 'schu-gabriel@hotmail.com',
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { email: 'schu-gabriel@hotmail.com' }, {});
  }
};
