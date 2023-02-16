const path = require('path');

const getPaths = (config) => {

  return {
    rootPath: config.path,
    buildPath: path.join(config.path, 'build'),
    scriptPath: path.join(config.path, 'assets/js/app'),
    stylesPath: path.join(config.path, 'assets/scss/styles.scss'),
    blocksScriptPath: path.join(config.path, 'blocks/src/index'),
    blocksStylesPath: path.join(config.path, 'blocks/src/scss/styles.scss')
  };
};

module.exports = getPaths;