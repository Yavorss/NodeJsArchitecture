const data = (Model, models = {}) => {
  const getAll = () => {
    return Model.findAll();
  };

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

  const findAll = (obj, includes = [], attributes = {}) => {
    return Model.findAll({
      where: obj,
      attributes: attributes,
      include: includes,
    });
  };

  const getById = (id, includes = [], attributes = {}) => {
    return Model.findById(id, {
      attributes: attributes,
      include: includes,
    });
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

  const update = (obj, options) => {
    return Model.update(obj, options);
  };

  const create = (obj) => {
    return Model.create(obj);
  };

  const remove = (obj) => {
    return Model.destroy({
      where: obj,
    });
  };

  const findCreateFind = (obj) => {
    return Model.findCreateFind({
      where: obj,
      defaults: obj,
    });
  };

  return {
    findAll: decorator(findAll),
    getAll: decorator(getAll),
    getById: decorator(getById),
    getOneByCriteria: decorator(getOneByCriteria),
    getAllByCriteria: decorator(getAllByCriteria),
    findCreateFind,
    update,
    create,
    remove,
  };
};

module.exports = data;
