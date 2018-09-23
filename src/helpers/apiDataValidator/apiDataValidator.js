const checkArray = (data, objValidator) => {
  const result = [];

  data.forEach((element) => {
    if (Array.isArray(element)) {
      throw new Error('Something went wrong!');
    }

    result.push(checkObjectFields(element, objValidator));
  });

  return result;
};

const checkObjectFields = (data, objValidator) => {
  const newObj = {};
  const theKeys = Object.keys(objValidator);

  theKeys.forEach((key) => {
    if (typeof objValidator[key] === 'function') {
      // Check the data by try chatch block
      try {
        const validatorResult = objValidator[key](data[key]);

        if (validatorResult !== true) {
          throw new Error('Something went wrong!');
        }
      } catch (error) {
        throw new Error(error.message);
      }

      // Set validated data to the new object
      newObj[key] = data[key];

      // Continue
      return;
    }

    // If the key is "skip", skip it
    if (objValidator[key] === 'skip') {
      // Set the data to the new object
      newObj[key] = data[key];

      // Continue
      return;
    }

    if (Array.isArray(objValidator[key])) {
      // Set validated data to the new object
      newObj[key] = checkArray(
        data[key],
        objValidator[key][0],
      );

      // Continue
      return;
    }

    if (typeof objValidator[key] === 'object') {
      // Set validated data to the new object
      newObj[key] = checkObjectFields(
        data[key],
        objValidator[key]
      );

      // Continue
      return;
    }
  });

  return newObj;
};

const apiDataValidator = (validator) => (req, res, next) => {
  let bodyData;
  let validatedData;

  if (req.method === 'GET') {
    bodyData = req.query;
  } else {
    bodyData = req.body;
  }

  if (Array.isArray(bodyData) && Array.isArray(validator)) {
    try {
      validatedData = checkArray(bodyData, validator[0]);
    } catch (error) {
      return res.status(406).json({
        message: error.message,
      });
    }
  }

  if (Array.isArray(bodyData) && !Array.isArray(validator)) {
    return res.status(406).json({
      message: 'Invalid data!',
    });
  }

  if (typeof bodyData === 'object' &&
    !Array.isArray(validator) && typeof validator === 'object'
  ) {
    try {
      validatedData = checkObjectFields(bodyData, validator);
    } catch (error) {
      return res.status(406).json({
        message: error.message,
      });
    }
  } else {
    return res.status(406).json({
      message: 'Invalid data!',
    });
  }

  if (req.method === 'GET') {
    req.query = validatedData;
  } else {
    req.body = validatedData;
  }

  return next();
};

module.exports = {
  _checkObjectFields: checkObjectFields,
  _checkArray: checkArray,
  apiDataValidator,
};
