// /**
//  * Configurate field
//  * @param {function} validatorFunction - The title of the book.
//  * @param {string} validatorInfo - The author of the book.
//  * @return {function}
//  */
const apiDataValidatorConfig = (
  validatorFunction,
  validatorInfo = {},
) => (data) => {
  // Set default value
  validatorInfo.empty = (validatorInfo.empty ||
    'Please, fill all required fields with valid data!'
  );
  validatorInfo.optional = (validatorInfo.optional || false);
  validatorInfo.errorMsg = (validatorInfo.errorMsg || null);

  if (typeof data === 'undefined' && !validatorInfo.optional) {
    throw new Error(validatorInfo.empty);
  }

  if (typeof data === 'undefined' && validatorInfo.optional) {
    return true;
  }

  return validatorFunction(data, validatorInfo);
};

module.exports = apiDataValidatorConfig;
