const checkFileExists = require('./checkFileExists');
const fs = require('fs').promises

const removeFileIfExists = async (path) => {
  if (await checkFileExists(path)) {
    await fs.unlink(path);
  }
}

module.exports = removeFileIfExists;
