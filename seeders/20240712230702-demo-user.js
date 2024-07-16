// Exemplo de seeder para inserir um usuário inicial na tabela Users

'use strict';
const bcrypt = require('bcryptjs'); // Certifique-se de usar bcryptjs aqui

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash da senha do usuário (coloque a senha desejada)
    const hashedPassword = await bcrypt.hash('password', 10);

    // Inserir um usuário inicial na tabela Users
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
    // Remover o usuário inicial inserido
    return queryInterface.bulkDelete('Users', { email: 'schu-gabriel@hotmail.com' }, {});
  }
};
