const fs = require('fs').promises;
const path = require('path');
const { PROCESS_FILE_NAME } = require('./constants');
const removeFileIfExists = require('./removeFileIfExists');

const writeProcessConfig = (server, config) => {

  const output = {
    port: server.options.port,
    https: server.options.https,
    hostname: config.hostname,
  };

  return fs.writeFile(
    path.join(config.path, PROCESS_FILE_NAME),
    JSON.stringify(output, null, 2)
  );
}

const removeProcessConfig = () => {
  return removeFileIfExists(
    path.join(process.cwd(), PROCESS_FILE_NAME)
  );
}

module.exports = {
  writeProcessConfig,
  removeProcessConfig
}