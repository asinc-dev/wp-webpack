const path = require('path');
const camelize = require('./camelize');

const getEnvPluginNames = () => {
  const currentPath = process.cwd();
  const currentFolder = path.basename(currentPath);

  return {
    [`PLUGIN_NAME`]: JSON.stringify(currentFolder),
    [`PLUGIN_NAME_MACRO`]: JSON.stringify(currentFolder.toUpperCase().replace(/\-/g,'_')),
    [`PLUGIN_NAME_CAMEL`]: JSON.stringify(camelize(currentFolder.replace(/\-/g,' ')))
  }
}

module.exports = getEnvPluginNames;