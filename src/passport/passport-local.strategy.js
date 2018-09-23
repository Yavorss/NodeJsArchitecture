const LocalStrategy = require('passport-local').Strategy;

const localStrategy = (options, UserService) => {
  return new LocalStrategy(options, async (email, password, done) => {
    const user = await UserService.getUser({
      email,
    });

    if (!user) {
      return done(null, false, {
        message: 'There is no such a user!',
      });
    }

    if (user.password !== password) {
      return done(null, false, {
        message: 'Incorrect password.',
      });
    }

    return done(null, user);
  });
};

module.exports = localStrategy;
