const userHooks = (data) => {
  const beforeCreate = () => {
    const uniqueEmail = async (user, options) => {
      const isThere = await data.user.getOneByCriteria({
        email: user.email,
      });

      if (isThere) {
        throw new Error('User with following email already exist!');
      }

      return true;
    };

    const checkTheRole = async (user, options) => {
      const theRole = await data.role.getOneByCriteria({
        id: user.RoleId,
      });

      if (!theRole) {
        throw new Error('There is no such a role!');
      }

      return true;
    };

    return {
      uniqueEmail,
      checkTheRole,
    };
  };

  return {
    beforeCreate: beforeCreate(),
  };
};

module.exports = userHooks;
