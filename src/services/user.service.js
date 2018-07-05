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
    return data.user.getById(id, includes);
  };

  const getUsers = async () => {
    const users = await data.user.findAll({}, [{
      model: 'Role',
      attributes: ['title'],
    }], [
      'name',
      'phone',
      'avatar',
    ]);

    return users;
  };

  const getUser = (options) => {
    return data.user.getOneByCriteria(options, [{
      model: 'Role',
    }]);
  };

  const login = (user, rememberMe) => {
    const tokenUser = setUserInfo(user);
    return generateToken(tokenUser, rememberMe);
  };

  const register = async (userData) => {
    const userExcists = await getUser({
      email: userData.email,
    });

    if (userExcists) {
      return {
        err: 'That email address is already in use!',
      };
    }

    const passwordExcists = await data.user.getOneByCriteria({
      password: userData.password,
    });

    if (passwordExcists) {
      return {
        err: 'The pincode is already in use!',
      };
    }

    const theRole = await data.role.getOneByCriteria({
      title: userData.role,
    });

    if (!theRole) {
      return {
        err: 'Something went wrong!',
      };
    }

    const user = await data.user.create({
      avatar: 'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      name: userData.name,
      RoleId: theRole.id,
    });

    return user;
  };

  return {
    getUser,
    getUserById,
    getUsers,
    login,
    register,
    setUserInfo,
    generateToken,
  };
};

module.exports = userService;
