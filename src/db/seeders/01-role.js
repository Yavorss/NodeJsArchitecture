'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      id: 1,
      name: 'administrator',
      createdAt: '2018-03-18 08:19:42',
      updatedAt: '2018-03-18 08:20:50',
      deletedAt: null,
    },
    {
      id: 2,
      name: 'user',
      createdAt: '2018-03-18 08:19:42',
      updatedAt: '2018-03-18 08:20:50',
      deletedAt: null,
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
