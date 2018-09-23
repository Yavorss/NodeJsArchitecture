const attachHooks = (model, modelHooks) => {
  const hookTypes = Object.keys(modelHooks);

  hookTypes.forEach((hookType) => {
    const hooks = Object.keys(modelHooks[hookType]);

    hooks.forEach((hook) => {
      model[hookType](modelHooks[hookType][hook]);
    });
  });
};

const init = (models, hooks) => {
  // Attach the User hooks
  attachHooks(models.User, hooks.UserHooks);
};

module.exports = init;
