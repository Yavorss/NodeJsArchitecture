const LocalStrategy = require('passport-local').Strategy;

const localStrategy = (options, UserService) => {
  return new LocalStrategy(options, async (username, password, done) => {
    const user = await UserService.getUser({
      password,
    });

    if (!user) {
      return done(null, {
        error: 'There is no such a user',
      });
    }

    if (user.password !== password) {
      return done(null, {
        error: 'Wrong pin code!',
      });
    }

    return done(null, user);
  });
};

module.exports = localStrategy;
