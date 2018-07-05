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

module.exports = {
    capitalizeFirstLetter,
    generateFilenameHash,
};
