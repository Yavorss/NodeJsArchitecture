const path = require('path');
const bcrypt = require('bcryptjs');

const generateFilenameHash = async (file) => {
  const fileName = path.basename(file.originalname,
    path.extname(file.originalname));
  const fileExt = path.extname(file.originalname);

  const hash = await bcrypt.hash(fileName + Date.now(), 7);

  return hash.replace(/\W+/g, '') + fileExt;
};

const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const validatorString = (string, validatorInfo) => {
  if (typeof string === 'undefined') {
    throw new Error(validatorInfo.empty);
  }

  if (!string || string.length < 2) {
    throw new Error(
      validatorInfo.errorMsg ||
      'Please, fill all required fields with valid data!'
    );
  }

  return true;
};

const validatorNumber = (theNumber, validatorInfo) => {
  if (typeof theNumber === 'undefined') {
    throw new Error(validatorInfo.empty);
  }

  if (isNaN(+(theNumber))) {
    throw new Error(
      validatorInfo.errorMsg ||
      'Please, fill all required fields with valid data!',
    );
  }

  return true;
};

const validatorBoolean = (validatorInfo, data) => {
  if (typeof data === 'undefined') {
    throw new Error(validatorInfo.empty);
  }

  if (data !== 'true' && data !== 'false' &&
    data !== true && data !== false
  ) {
    throw new Error(
      validatorInfo.errorMsg ||
      'Please, fill all required fields with valid data!',
    );
  }

  return true;
};

module.exports = {
  capitalizeFirstLetter,
  generateFilenameHash,
  validatorString,
  validatorNumber,
  validatorBoolean,
};
