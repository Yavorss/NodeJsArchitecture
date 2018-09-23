'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      avatar: '',
      name: 'Georgi Ivanov',
      password: '4488',
      email: 'georgi@ivanov.bg',
      phone: '+359888888888',
      RoleId: 1,
      createdAt: '2018-03-18 08:19:42',
      updatedAt: '2018-03-18 08:20:50',
      deletedAt: null,
    },
    {
      id: 2,
      avatar: '',
      name: 'Ivanka Ivanova',
      password: '3377',
      email: 'ivanka@ivanova.bg',
      phone: '+359888888887',
      RoleId: 2,
      createdAt: '2018-03-18 08:19:42',
      updatedAt: '2018-03-18 08:20:50',
      deletedAt: null,
    },
    {
      id: 3,
      avatar: '',
      name: 'Kiril Borisov',
      password: '2266',
      email: 'kiril@borisov.bg',
      phone: '+359888888886',
      RoleId: 2,
      createdAt: '2018-03-18 08:19:42',
      updatedAt: '2018-03-18 08:20:50',
      deletedAt: null,
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
