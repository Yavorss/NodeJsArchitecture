const init = (models, genericData) => {
  const data = {
    user: genericData(models.User, {
      Role: models.Role,
    }),
    role: genericData(models.Role, {}),
  };

  return data;
};

module.exports = init;
