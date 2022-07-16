const webpack = require('webpack');
const getConfig = require('./helpers/getConfig');

const build = () => {

  const config = getConfig();

  const webpackOptions = {
    ...config,
    mode: 'production'
  };

  const webpackConfig = require('./webpack-config')(webpackOptions);
  
  webpack(webpackConfig, async(err, stats) => {
    if (err) {
      return console.error('Error building webpack', err);
    }
    console.log(stats.toString({
      chunks: false,
      colors: true
    }));
  });
};

module.exports = build;

