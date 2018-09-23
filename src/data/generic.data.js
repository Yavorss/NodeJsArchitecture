const data = (Model, models = {}, sequelize) => {
  const decorator = (fn) => {
    return (obj, includes = [], attributes = {}) => {
      includes = includes.map((include) => {
        include.model = models[include.model];

        return include;
      });

      const result = fn.apply('', [obj, includes, attributes]);

      return result;
    };
  };

  const getOneByCriteria = (findObj, includes = [], attributes = {}) => {
    return Model.findOne({
      where: findObj,
      attributes: attributes,
      include: includes,
    });
  };

  const getAllByCriteria = (findObj, includes = [], attributes = {}) => {
    return Model.findAll({
      where: findObj,
      attributes: attributes,
      include: includes,
    });
  };

  const findCreateFind = (obj) => {
    return Model.findCreateFind({
      where: obj,
      defaults: obj,
    });
  };

  const update = (obj, options) => {
    return Model.update(obj, options);
  };

  const create = (obj, transaction = {}) => {
    return Model.create(obj, transaction);
  };

  const remove = (obj, transaction = {}) => {
    return Model.destroy({
      where: obj,
    }, transaction);
  };

  return {
    getOneByCriteria: decorator(getOneByCriteria),
    getAllByCriteria: decorator(getAllByCriteria),
    findCreateFind,
    update,
    create,
    remove,
  };
};

module.exports = data;
