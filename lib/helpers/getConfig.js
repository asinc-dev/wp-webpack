const path = require('path');

const getConfig = () => {

  const currentPath = process.cwd();
  const currentFolder = path.basename(currentPath)

  const config = {
    port: 9090,
    hostname: 'localhost',
    https: false,
    publicPath: `/wp-content/themes/${currentFolder}/`,
    path: process.cwd()
  }

  try {
    const configPath = path.join(currentPath, 'config');
    const localConfig = require(configPath);
    return { ...config, ...localConfig };

  } catch (error) {
    return config;
  }
};

module.exports = getConfig;