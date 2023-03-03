const path = require('path');
const getPort = require('./getPort');
const { getEnv } = require('./getEnv');

const getConfig = async () => {

  const currentPath = process.cwd();
  const currentFolder = path.basename(currentPath);
  const parentDirectory = path.basename(path.dirname(currentPath));

  const config = {
    hostname: getEnv('DEV_SERVER_HOSTNAME', 'localhost'),
    https: getEnv('DEV_SERVER_HTTPS', false),
    publicPath: `/wp-content/${parentDirectory}/${currentFolder}/`,
    path: process.cwd(),
  }

  const userPort = getEnv('DEV_SERVER_PORT');
  if (userPort) {
    config.port = userPort;
  } else {
    config.port = await getPort({ port: [ 8181, 8282, 8383 ] })
  }

  // Allow overriding params via arguments
  const argv = require('minimist')(process.argv.slice(2));
  for (const param in config) {
    if (argv[param]) {
      config[param] = argv[param];
    }
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