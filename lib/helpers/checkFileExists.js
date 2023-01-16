const fs = require('fs');

/**
 * Checks if the profile filePath exists
 * 
 * @param {string} filepath 
 * @returns {Promise<boolean>}
 */
const checkFileExists = (filepath) => {
  return new Promise(resolve => {
    fs.access(filepath, fs.constants.F_OK, error => {
      resolve(!error);
    });
  });
}

module.exports = checkFileExists;