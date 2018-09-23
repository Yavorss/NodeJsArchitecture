const jwt = require('jsonwebtoken');

const userService = (data, config) => {
  const setUserInfo = (user) => {
    return {
      id: user.id,
      role: user.Role.title,
    };
  };

  const generateToken = (user, expire) => {
    return jwt.sign({
      id: user.id,
      role: user.role,
    }, config.passport.secret, {
      expiresIn: '1d',
      issuer: 'hype-api',
    });
  };

  const getUserById = (id, includes = []) => {
    return data.user.getOneByCriteria({
      id,
    }, includes);
  };

  const getAllUsers = async () => {
    const users = await data.user.getAllByCriteria({}, [{
      model: 'Role',
      attributes: ['title'],
    }], [
      'name',
      'phone',
      'avatar',
    ]);

    return users;
  };

  const getUser = async (options) => {
    return await data.user.getOneByCriteria(options, [{
      model: 'Role',
    }]);
  };

  const login = (user, rememberMe) => {
    const tokenUser = setUserInfo(user);

    return generateToken(tokenUser, rememberMe);
  };

  const register = async (userData) => {
    return await data.user.create(userData).catch((error) => {
      throw new Error(error.message);
    });
  };

  return {
    getUser,
    getUserById,
    getAllUsers,
    login,
    register,
    setUserInfo,
    generateToken,
  };
};

module.exports = userService;
