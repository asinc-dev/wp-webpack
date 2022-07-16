const { merge } = require('webpack-merge');

const getWebpackConfig = (config) => {

  const webpackBase = require('./webpack.base')(config);

  // Based on the target env load the appropriate config
  let webpackEnv = {};

  if (config.mode === 'production') {
    webpackEnv = require('./webpack.production')(config);
  }

  if (config.mode === 'development') {
    webpackEnv = require('./webpack.development')(config);
  }

  return merge(webpackBase, webpackEnv);
}

// Export the merged result
module.exports = getWebpackConfig;