'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: false,
    },
  }, {
    paranoid: true,
  });
  User.associate = (models) => {
    const {
      Role,
    } = models;

    User.belongsTo(Role);
  };

  return User;
};
