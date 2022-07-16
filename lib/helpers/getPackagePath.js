const path = require('path');

const getPackagePath = () => {
  return path.join(__dirname, '../../');
}

module.exports = getPackagePath;